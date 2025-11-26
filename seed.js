// ============================================
// SEED SCRIPT - Run this to populate database
// Usage: node seed.js
// ============================================

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const seedProducts = require('./seedData');

const DB_NAME = 'ecommerce';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnkbmnh.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Connected to MongoDB successfully!\n');

    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');

    // Check current count
    const existingCount = await productsCollection.countDocuments();
    console.log(`📊 Current products in database: ${existingCount}`);

    // Ask for confirmation if products exist
    if (existingCount > 0) {
      console.log('⚠️  Existing products will be DELETED and replaced with seed data.');
    }

    // Clear existing products
    console.log('\n🗑️  Clearing existing products...');
    await productsCollection.deleteMany({});
    console.log('✅ Cleared existing products.');

    // Create indexes
    console.log('\n📇 Creating indexes...');
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ subcategory: 1 });
    await productsCollection.createIndex({ brand: 1 });
    await productsCollection.createIndex({ title: 'text', shortDescription: 'text' });
    console.log('✅ Indexes created.');

    // Insert seed data
    console.log('\n🌱 Seeding products...');
    const result = await productsCollection.insertMany(seedProducts);
    console.log(`✅ Successfully seeded ${result.insertedCount} products!\n`);

    // Show summary
    console.log('📋 SEED SUMMARY:');
    console.log('================');
    
    const categories = await productsCollection.aggregate([
      {
        $group: {
          _id: { category: '$category', subcategory: '$subcategory' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.category': 1, '_id.subcategory': 1 } }
    ]).toArray();

    let currentCategory = '';
    categories.forEach(cat => {
      if (cat._id.category !== currentCategory) {
        currentCategory = cat._id.category;
        console.log(`\n📁 ${currentCategory}`);
      }
      console.log(`   └── ${cat._id.subcategory}: ${cat.count} products`);
    });

    const totalCount = await productsCollection.countDocuments();
    console.log(`\n📊 TOTAL PRODUCTS: ${totalCount}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed.');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
