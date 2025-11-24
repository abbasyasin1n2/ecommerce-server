const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

// CORS configuration - allow requests from Next.js client
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies/credentials
}))
app.use(express.json())

// Database name - change this to your actual database name
const DB_NAME = 'ecommerce';

// Test endpoint to verify server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// User endpoint - save or check user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, image, provider } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      // Update user info if it changed (e.g., name or image updated on Google)
      const updates = {
        updatedAt: new Date(),
      };
      
      // Only update if values changed
      if (name && name !== existingUser.name) {
        updates.name = name;
      }
      if (image && image !== existingUser.image) {
        updates.image = image;
      }
      
      // Update if there are changes
      if (Object.keys(updates).length > 1) {
        await usersCollection.updateOne(
          { email },
          { $set: updates }
        );
        const updatedUser = await usersCollection.findOne({ email });
        return res.json({ 
          message: 'User exists - updated',
          user: updatedUser 
        });
      }
      
      return res.json({ 
        message: 'User exists',
        user: existingUser 
      });
    }

    // Create new user
    const newUser = {
      name: name || '',
      email,
      image: image || '',
      provider: provider || 'google',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return res.status(201).json({
      message: 'User created',
      userId: result.insertedId,
      user: newUser,
    });
  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ 
      error: 'Failed to save user',
      details: error.message 
    });
  }
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnkbmnh.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB when server starts
async function connectDB() {
  try {
    await client.connect();
    // Test connection with admin database
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    
    // Initialize database and collections if needed
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    
    // Create index on email for faster lookups
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log(`Database "${DB_NAME}" ready with users collection`);
    
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Start server and connect to database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Graceful shutdown - close connection when server stops
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  await client.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down server...');
  await client.close();
  process.exit(0);
});
