const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const seedProducts = require('./seedData');

const app = express()
const port = process.env.PORT || 5000

// CORS configuration - allow requests from Next.js client
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

const DB_NAME = 'ecommerce';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnkbmnh.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

// ============================================
// TEST ENDPOINT
// ============================================
app.get('/api/test', (req, res) => {
  res.json({ message: 'ElectroHub API is running!' });
});

// ============================================
// PRODUCTS API ENDPOINTS
// ============================================

// GET all products with optional filtering
app.get('/api/products', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const { category, subcategory, search, limit, page } = req.query;
    
    // Build query filter
    let filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;
    
    const products = await productsCollection
      .find(filter)
      .skip(skip)
      .limit(limitNum)
      .toArray();
    
    const total = await productsCollection.countDocuments(filter);
    
    res.json({
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
});

// GET products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const { category } = req.params;
    const { subcategory } = req.query;
    
    let filter = { category: { $regex: category, $options: 'i' } };
    if (subcategory) {
      filter.subcategory = { $regex: subcategory, $options: 'i' };
    }
    
    const products = await productsCollection.find(filter).toArray();
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// GET all categories and subcategories
app.get('/api/categories', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const categories = await productsCollection.aggregate([
      {
        $group: {
          _id: { category: '$category', subcategory: '$subcategory' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.category',
          subcategories: {
            $push: {
              name: '$_id.subcategory',
              count: '$count'
            }
          },
          totalCount: { $sum: '$count' }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          subcategories: 1,
          totalCount: 1
        }
      }
    ]).toArray();
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
});

// POST create new product
app.post('/api/products', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const {
      title,
      shortDescription,
      fullDescription,
      price,
      imageUrl,
      category,
      subcategory,
      brand,
      rating,
      specifications,
      features,
      createdBy
    } = req.body;
    
    // Validation
    if (!title || !price || !category) {
      return res.status(400).json({ error: 'Title, price, and category are required' });
    }
    
    const newProduct = {
      title,
      shortDescription: shortDescription || '',
      fullDescription: fullDescription || '',
      price: parseFloat(price),
      imageUrl: imageUrl || '',
      category,
      subcategory: subcategory || '',
      brand: brand || '',
      rating: parseFloat(rating) || 0,
      specifications: specifications || {},
      features: features || [],
      createdBy: createdBy || 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await productsCollection.insertOne(newProduct);
    
    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertedId,
      product: { ...newProduct, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;
    
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = await productsCollection.findOne({ _id: new ObjectId(id) });
    
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
});

// ============================================
// USERS API ENDPOINTS
// ============================================

// POST create/update user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, image, provider } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      const updates = { updatedAt: new Date() };
      
      if (name && name !== existingUser.name) updates.name = name;
      if (image && image !== existingUser.image) updates.image = image;
      
      if (Object.keys(updates).length > 1) {
        await usersCollection.updateOne({ email }, { $set: updates });
        const updatedUser = await usersCollection.findOne({ email });
        return res.json({ message: 'User exists - updated', user: updatedUser });
      }
      
      return res.json({ message: 'User exists', user: existingUser });
    }

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
    return res.status(500).json({ error: 'Failed to save user', details: error.message });
  }
});

// ============================================
// ORDERS API ENDPOINTS
// ============================================

// POST create new order
app.post('/api/orders', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const {
      userEmail,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
      notes
    } = req.body;

    // Validation
    if (!userEmail || !items || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ 
        error: 'Missing required fields: userEmail, items, shippingAddress, paymentMethod' 
      });
    }

    const newOrder = {
      userEmail,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      subtotal: parseFloat(subtotal) || 0,
      shipping: parseFloat(shipping) || 0,
      total: parseFloat(total) || 0,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await ordersCollection.insertOne(newOrder);

    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertedId,
      order: { ...newOrder, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// GET all orders (admin)
app.get('/api/orders', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const { status, page, limit } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const orders = await ordersCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .toArray();

    const total = await ordersCollection.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

// GET orders by user email
app.get('/api/orders/user/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const { email } = req.params;

    const orders = await ordersCollection
      .find({ userEmail: decodeURIComponent(email) })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

// GET single order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order', details: error.message });
  }
});

// PUT update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(id) });

    res.json({
      message: 'Order updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order', details: error.message });
  }
});

// DELETE cancel order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    // Instead of deleting, mark as cancelled
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'cancelled', updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Failed to cancel order', details: error.message });
  }
});

// ============================================
// SEED ENDPOINT (for development)
// ============================================
app.post('/api/seed', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    await productsCollection.deleteMany({});
    const result = await productsCollection.insertMany(seedProducts);
    
    res.json({
      message: 'Database seeded successfully',
      insertedCount: result.insertedCount
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database', details: error.message });
  }
});

// ============================================
// DATABASE CONNECTION
// ============================================
async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully!");
    
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    const productsCollection = db.collection('products');
    
    // Create indexes
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ subcategory: 1 });
    await productsCollection.createIndex({ brand: 1 });
    await productsCollection.createIndex({ title: 'text', shortDescription: 'text' });
    
    // Orders indexes
    const ordersCollection = db.collection('orders');
    await ordersCollection.createIndex({ userEmail: 1 });
    await ordersCollection.createIndex({ status: 1 });
    await ordersCollection.createIndex({ createdAt: -1 });
    
    console.log(`📦 Database "${DB_NAME}" ready`);
    
    return client;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// Auto-seed on startup if database is empty
async function autoSeed() {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    const count = await productsCollection.countDocuments();
    
    if (count === 0) {
      console.log('🌱 Seeding database with products...');
      const result = await productsCollection.insertMany(seedProducts);
      console.log(`✅ Seeded ${result.insertedCount} products!`);
    } else {
      console.log(`📊 Database has ${count} products`);
    }
  } catch (error) {
    console.error('❌ Auto-seed error:', error);
  }
}

// ============================================
// START SERVER
// ============================================
connectDB().then(async () => {
  await autoSeed();
  
  app.listen(port, () => {
    console.log(`\n🚀 ElectroHub API Server running on port ${port}`);
    console.log(`\n📡 API Endpoints:`);
    console.log(`   GET    /api/test`);
    console.log(`   GET    /api/products`);
    console.log(`   GET    /api/products/:id`);
    console.log(`   GET    /api/products/category/:category`);
    console.log(`   GET    /api/categories`);
    console.log(`   POST   /api/products`);
    console.log(`   PUT    /api/products/:id`);
    console.log(`   DELETE /api/products/:id`);
    console.log(`   POST   /api/users`);
    console.log(`   POST   /api/orders`);
    console.log(`   GET    /api/orders`);
    console.log(`   GET    /api/orders/:id`);
    console.log(`   GET    /api/orders/user/:email`);
    console.log(`   PUT    /api/orders/:id/status`);
    console.log(`   DELETE /api/orders/:id`);
    console.log(`   POST   /api/seed`);
    console.log(`\n💡 Run 'node seed.js' to reseed database manually\n`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down server...');
  await client.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n👋 Shutting down server...');
  await client.close();
  process.exit(0);
});
