import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { treeData, findNodeById, getPathToNode, buildTrieFromTree } from './src/dekhoindia.js';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || (process.env.VERCEL ? '' : 'mongodb://127.0.0.1:27017/dekhoindia');
let mongoConnection;

app.use(cors());
app.use(express.json());

const connectToMongo = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!MONGODB_URI) return Promise.reject(new Error('MONGODB_URI is not configured.'));
  if (!mongoConnection) {
    mongoConnection = mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
      .then(() => console.log('Connected to MongoDB (Dekho Bharat)'))
      .catch((error) => {
        mongoConnection = null;
        throw error;
      });
  }
  return mongoConnection;
};

// --- BOOKING SCHEMA ---
const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true, maxlength: 100 },
  userPhone: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    maxlength: 20,
    validate: value => (value.match(/\d/g) || []).length >= 7 && (value.match(/\d/g) || []).length <= 15
  },
  userEmail: { type: String, lowercase: true, trim: true, maxlength: 254 },
  city: { type: String, required: true, trim: true, maxlength: 120 },
  activity: { type: String, required: true, trim: true, maxlength: 160 },
  price: { type: String, required: true, maxlength: 40 },
  priceAmount: { type: Number, required: true, min: 0 },
  guideName: { type: String, default: 'Standard Guide', maxlength: 120 },
  bookingDate: { type: Date, default: Date.now },
  voucherId: { type: String, required: true, unique: true, maxlength: 40 },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

const Booking = mongoose.model('Booking', bookingSchema);

// --- USER SCHEMA FOR LOGIN ---
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String
});
const User = mongoose.model('User', userSchema);

// Build Trie once on server start
const trie = buildTrieFromTree(treeData);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Dekho Bharat Backend Running' });
});

app.use('/api', async (req, res, next) => {
  if (req.path === '/health') return next();
  try {
    await connectToMongo();
    next();
  } catch (error) {
    res.status(503).json({ success: false, message: error.message || 'MongoDB is unavailable.' });
  }
});

// --- AUTH API ---
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

    const newUser = new User({ name, email, password }); // Note: In production use bcrypt
    await newUser.save();
    res.status(201).json({ success: true, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Save Booking to MongoDB
app.post('/api/bookings', async (req, res) => {
  try {
    const { userName, userPhone, userEmail, city, activity, price, guideName, voucherId } = req.body;
    const rawPrice = String(price || '');
    if (rawPrice.includes('-')) {
      return res.status(400).json({ success: false, message: 'Price must be a non-negative amount.' });
    }
    const normalizedPrice = rawPrice.replace(/[^\d.]/g, '');
    const priceAmount = Number(normalizedPrice);
    if (!Number.isFinite(priceAmount) || priceAmount < 0) {
      return res.status(400).json({ success: false, message: 'Price must be a non-negative amount.' });
    }
    const newBooking = new Booking({
      userName,
      userPhone,
      userEmail,
      city,
      activity,
      price,
      priceAmount,
      guideName,
      voucherId
    });
    await newBooking.save();
    console.log(`📌 New Booking saved: ${userName} -> ${activity} in ${city}`);
    res.status(201).json({ success: true, message: 'Booking saved to MongoDB', booking: newBooking });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Voucher ID already exists.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/bookings/list', async (req, res) => {
  try {
    const query = {};
    if (typeof req.query.email === 'string' && req.query.email.trim()) {
      query.userEmail = req.query.email.trim().toLowerCase();
    }
    const bookings = await Booking.find(query).sort({ bookingDate: -1 }).limit(100).lean();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch('/api/bookings/:voucherId', async (req, res) => {
  try {
    const allowedFields = ['userName', 'userPhone', 'userEmail', 'city', 'activity', 'price', 'guideName'];
    const updates = Object.fromEntries(
      Object.entries(req.body || {}).filter(([field]) => allowedFields.includes(field))
    );
    if (!Object.keys(updates).length) {
      return res.status(400).json({ success: false, message: 'Provide at least one supported field to update.' });
    }
    if (updates.userEmail) updates.userEmail = updates.userEmail.trim().toLowerCase();
    if (updates.price !== undefined) {
      if (String(updates.price).includes('-')) {
        return res.status(400).json({ success: false, message: 'Price must be a non-negative amount.' });
      }
      const normalizedPrice = String(updates.price).replace(/[^\d.]/g, '');
      updates.priceAmount = Number(normalizedPrice);
      if (!normalizedPrice || !Number.isFinite(updates.priceAmount) || updates.priceAmount < 0) {
        return res.status(400).json({ success: false, message: 'Price must be a non-negative amount.' });
      }
    }
    updates.updatedAt = new Date();
    const booking = await Booking.findOneAndUpdate(
      { voucherId: req.params.voucherId },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    if (!booking) return res.status(404).json({ success: false, message: 'Voucher not found.' });
    res.json({ success: true, booking });
  } catch (error) {
    const clientError = error.name === 'ValidationError' || error.name === 'CastError';
    res.status(clientError ? 400 : 500).json({ success: false, message: error.message });
  }
});

// API: Remove Booking from MongoDB
app.delete('/api/bookings/:voucherId', async (req, res) => {
  try {
    const { voucherId } = req.params;
    const result = await Booking.findOneAndDelete({ voucherId });
    if (result) {
      console.log(`🗑️ Booking deleted: ${voucherId}`);
      res.json({ success: true, message: 'Booking removed from MongoDB' });
    } else {
      res.status(404).json({ success: false, message: 'Voucher not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/stats', async (_req, res) => {
  try {
    const [totalBookings, totalUsers, topCities, topActivities, revenue, monthlyBookings] = await Promise.all([
      Booking.countDocuments({}),
      User.countDocuments({}),
      Booking.aggregate([
        { $match: { city: { $type: 'string', $ne: '' } } },
        { $group: { _id: '$city', count: { $sum: 1 }, revenue: { $sum: { $ifNull: ['$priceAmount', 0] } } } },
        { $sort: { count: -1, _id: 1 } },
        { $limit: 5 }
      ]),
      Booking.aggregate([
        { $match: { activity: { $type: 'string', $ne: '' } } },
        { $group: { _id: '$activity', count: { $sum: 1 }, revenue: { $sum: { $ifNull: ['$priceAmount', 0] } } } },
        { $sort: { count: -1, _id: 1 } },
        { $limit: 5 }
      ]),
      Booking.aggregate([
        { $group: { _id: null, total: { $sum: { $ifNull: ['$priceAmount', 0] } } } }
      ]),
      Booking.aggregate([
        { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$bookingDate' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 12 }
      ])
    ]);

    res.json({
      totalBookings,
      totalUsers,
      totalRevenue: revenue[0]?.total || 0,
      topCities: topCities.map(({ _id, ...item }) => ({ city: _id, ...item })),
      topActivities: topActivities.map(({ _id, ...item }) => ({ activity: _id, ...item })),
      monthlyBookings: monthlyBookings.map(({ _id, ...item }) => ({ month: _id, ...item }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get the full decision tree
app.get('/api/tree', (_req, res) => {
  res.json(treeData);
});

// Get a node by ID using DFS (N-ary tree)
app.get('/api/node/:id', (req, res) => {
  const { id } = req.params;
  const node = findNodeById(treeData, id);
  if (!node) {
    return res.status(404).json({ error: `Node with id "${id}" not found` });
  }
  res.json(node);
});

// Get breadcrumb path to a node
app.get('/api/path/:id', (req, res) => {
  const { id } = req.params;
  const path = getPathToNode(treeData, id);
  if (!path) {
    return res.status(404).json({ error: `Path to node "${id}" not found` });
  }
  res.json(path);
});

// Trie prefix search for city names
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  const results = trie.search(q);
  res.json(results);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    connectToMongo()
      .then(() => console.log(`Dekho Bharat backend running on http://localhost:${PORT}`))
      .catch(error => console.error('MongoDB connection error:', error.message));
  });
}

export default app;


