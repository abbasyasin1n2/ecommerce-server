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
      .sort({ createdAt: -1 })  // Sort by newest first
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

// GET products by user (createdBy)
app.get('/api/products/user/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ error: 'User email is required' });
    }
    
    const products = await productsCollection
      .find({ createdBy: email })
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      products,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Failed to fetch user products', details: error.message });
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
// CART API ENDPOINTS
// ============================================

// GET user's cart
app.get('/api/cart/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const cartsCollection = db.collection('carts');

    const { email } = req.params;
    const cart = await cartsCollection.findOne({ userEmail: decodeURIComponent(email) });

    res.json({ items: cart?.items || [] });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
  }
});

// PUT update user's cart (replace entire cart)
app.put('/api/cart/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const cartsCollection = db.collection('carts');

    const { email } = req.params;
    const { items } = req.body;

    const result = await cartsCollection.updateOne(
      { userEmail: decodeURIComponent(email) },
      { 
        $set: { 
          items: items || [],
          updatedAt: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    res.json({ message: 'Cart updated successfully', items });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart', details: error.message });
  }
});

// DELETE clear user's cart
app.delete('/api/cart/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const cartsCollection = db.collection('carts');

    const { email } = req.params;
    
    await cartsCollection.updateOne(
      { userEmail: decodeURIComponent(email) },
      { $set: { items: [], updatedAt: new Date() } }
    );

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart', details: error.message });
  }
});

// ============================================
// WISHLIST API ENDPOINTS
// ============================================

// GET user's wishlist
app.get('/api/wishlist/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const wishlistsCollection = db.collection('wishlists');

    const { email } = req.params;
    const wishlist = await wishlistsCollection.findOne({ userEmail: decodeURIComponent(email) });

    res.json({ items: wishlist?.items || [] });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist', details: error.message });
  }
});

// PUT update user's wishlist (replace entire wishlist)
app.put('/api/wishlist/:email', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const wishlistsCollection = db.collection('wishlists');

    const { email } = req.params;
    const { items } = req.body;

    await wishlistsCollection.updateOne(
      { userEmail: decodeURIComponent(email) },
      { 
        $set: { 
          items: items || [],
          updatedAt: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    res.json({ message: 'Wishlist updated successfully', items });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    res.status(500).json({ error: 'Failed to update wishlist', details: error.message });
  }
});

// POST add item to wishlist
app.post('/api/wishlist/:email/add', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const wishlistsCollection = db.collection('wishlists');

    const { email } = req.params;
    const { product } = req.body;

    const wishlist = await wishlistsCollection.findOne({ userEmail: decodeURIComponent(email) });
    const items = wishlist?.items || [];
    
    // Check if already exists
    const exists = items.some(item => item._id === product._id);
    if (exists) {
      return res.json({ message: 'Item already in wishlist', items });
    }

    items.push(product);

    await wishlistsCollection.updateOne(
      { userEmail: decodeURIComponent(email) },
      { 
        $set: { items, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    res.json({ message: 'Item added to wishlist', items });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Failed to add to wishlist', details: error.message });
  }
});

// DELETE remove item from wishlist
app.delete('/api/wishlist/:email/:productId', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const wishlistsCollection = db.collection('wishlists');

    const { email, productId } = req.params;

    const wishlist = await wishlistsCollection.findOne({ userEmail: decodeURIComponent(email) });
    const items = (wishlist?.items || []).filter(item => item._id !== productId);

    await wishlistsCollection.updateOne(
      { userEmail: decodeURIComponent(email) },
      { $set: { items, updatedAt: new Date() } }
    );

    res.json({ message: 'Item removed from wishlist', items });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist', details: error.message });
  }
});

// ============================================
// REVIEWS API ENDPOINTS
// ============================================

// GET reviews for a product
app.get('/api/reviews/product/:productId', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection('reviews');

    const { productId } = req.params;
    const { page, limit, sort } = req.query;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Sort options: newest, oldest, highest, lowest
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'highest') sortOption = { rating: -1, createdAt: -1 };
    if (sort === 'lowest') sortOption = { rating: 1, createdAt: -1 };

    const reviews = await reviewsCollection
      .find({ productId })
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .toArray();

    const total = await reviewsCollection.countDocuments({ productId });

    // Calculate rating stats
    const stats = await reviewsCollection.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          rating5: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
          rating4: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
          rating3: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
          rating2: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
          rating1: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } },
        }
      }
    ]).toArray();

    const ratingStats = stats[0] || {
      averageRating: 0,
      totalReviews: 0,
      rating5: 0,
      rating4: 0,
      rating3: 0,
      rating2: 0,
      rating1: 0,
    };

    res.json({
      reviews,
      stats: {
        averageRating: ratingStats.averageRating?.toFixed(1) || 0,
        totalReviews: ratingStats.totalReviews,
        distribution: {
          5: ratingStats.rating5,
          4: ratingStats.rating4,
          3: ratingStats.rating3,
          2: ratingStats.rating2,
          1: ratingStats.rating1,
        }
      },
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
});

// GET user's review for a product
app.get('/api/reviews/user/:email/product/:productId', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection('reviews');

    const { email, productId } = req.params;

    const review = await reviewsCollection.findOne({
      userEmail: decodeURIComponent(email),
      productId
    });

    res.json({ review });
  } catch (error) {
    console.error('Error fetching user review:', error);
    res.status(500).json({ error: 'Failed to fetch review', details: error.message });
  }
});

// POST create a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection('reviews');
    const productsCollection = db.collection('products');

    const { productId, userEmail, userName, userImage, rating, title, comment } = req.body;

    // Validation
    if (!productId || !userEmail || !rating) {
      return res.status(400).json({ error: 'productId, userEmail, and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Check if user already reviewed this product
    const existingReview = await reviewsCollection.findOne({
      productId,
      userEmail: decodeURIComponent(userEmail)
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const newReview = {
      productId,
      userEmail,
      userName: userName || 'Anonymous',
      userImage: userImage || '',
      rating: parseInt(rating),
      title: title || '',
      comment: comment || '',
      helpful: 0,
      verified: false, // Could be set based on purchase history
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await reviewsCollection.insertOne(newReview);

    // Update product's average rating
    const stats = await reviewsCollection.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]).toArray();

    if (stats[0]) {
      await productsCollection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $set: {
            rating: parseFloat(stats[0].averageRating.toFixed(1)),
            reviews: stats[0].totalReviews,
            updatedAt: new Date()
          }
        }
      );
    }

    res.status(201).json({
      message: 'Review submitted successfully',
      review: { ...newReview, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review', details: error.message });
  }
});

// PUT update a review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection('reviews');
    const productsCollection = db.collection('products');

    const { id } = req.params;
    const { userEmail, rating, title, comment } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }

    // Find the review and verify ownership
    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userEmail !== decodeURIComponent(userEmail)) {
      return res.status(403).json({ error: 'You can only edit your own reviews' });
    }

    const updateData = { updatedAt: new Date() };
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }
      updateData.rating = parseInt(rating);
    }
    if (title !== undefined) updateData.title = title;
    if (comment !== undefined) updateData.comment = comment;

    await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    // Update product's average rating
    const stats = await reviewsCollection.aggregate([
      { $match: { productId: review.productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]).toArray();

    if (stats[0]) {
      await productsCollection.updateOne(
        { _id: new ObjectId(review.productId) },
        {
          $set: {
            rating: parseFloat(stats[0].averageRating.toFixed(1)),
            reviews: stats[0].totalReviews,
            updatedAt: new Date()
          }
        }
      );
    }

    const updatedReview = await reviewsCollection.findOne({ _id: new ObjectId(id) });

    res.json({
      message: 'Review updated successfully',
      review: updatedReview
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review', details: error.message });
  }
});

// DELETE a review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection('reviews');
    const productsCollection = db.collection('products');

    const { id } = req.params;
    const { userEmail } = req.query;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }

    // Find the review and verify ownership
    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userEmail !== decodeURIComponent(userEmail)) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    const productId = review.productId;

    await reviewsCollection.deleteOne({ _id: new ObjectId(id) });

    // Update product's average rating
    const stats = await reviewsCollection.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]).toArray();

    const newRating = stats[0]?.averageRating || 0;
    const newReviewCount = stats[0]?.totalReviews || 0;

    await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          rating: parseFloat(newRating.toFixed(1)),
          reviews: newReviewCount,
          updatedAt: new Date()
        }
      }
    );

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review', details: error.message });
  }
});

// POST mark review as helpful
app.post('/api/reviews/:id/helpful', async (req, res) => {
  try {
    const db = client.db(DB_NAME);
    const reviewsCollection = db.collection('reviews');

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }

    await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { helpful: 1 } }
    );

    res.json({ message: 'Marked as helpful' });
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    res.status(500).json({ error: 'Failed to mark as helpful', details: error.message });
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
    
    // Cart indexes
    const cartsCollection = db.collection('carts');
    await cartsCollection.createIndex({ userEmail: 1 }, { unique: true });
    
    // Wishlist indexes
    const wishlistsCollection = db.collection('wishlists');
    await wishlistsCollection.createIndex({ userEmail: 1 }, { unique: true });
    
    // Reviews indexes
    const reviewsCollection = db.collection('reviews');
    await reviewsCollection.createIndex({ productId: 1 });
    await reviewsCollection.createIndex({ userEmail: 1 });
    await reviewsCollection.createIndex({ productId: 1, userEmail: 1 }, { unique: true });
    await reviewsCollection.createIndex({ createdAt: -1 });
    
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
    console.log(`   GET    /api/cart/:email`);
    console.log(`   PUT    /api/cart/:email`);
    console.log(`   DELETE /api/cart/:email`);
    console.log(`   GET    /api/wishlist/:email`);
    console.log(`   PUT    /api/wishlist/:email`);
    console.log(`   POST   /api/wishlist/:email/add`);
    console.log(`   DELETE /api/wishlist/:email/:productId`);
    console.log(`   GET    /api/reviews/product/:productId`);
    console.log(`   GET    /api/reviews/user/:email/product/:productId`);
    console.log(`   POST   /api/reviews`);
    console.log(`   PUT    /api/reviews/:id`);
    console.log(`   DELETE /api/reviews/:id`);
    console.log(`   POST   /api/reviews/:id/helpful`);
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
