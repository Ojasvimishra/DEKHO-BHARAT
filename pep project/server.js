import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { treeData, findNodeById, getPathToNode, buildTrieFromTree } from './src/dekhoindia.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
mongoose.connect('mongodb://127.0.0.1:27017/dekhoindia')
  .then(() => console.log('✅ Connected to MongoDB (Dekho India)'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- BOOKING SCHEMA ---
const bookingSchema = new mongoose.Schema({
  userName: String,
  userPhone: String,
  city: String,
  activity: String,
  price: String,
  guideName: String,
  bookingDate: { type: Date, default: Date.now },
  voucherId: String
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
    const { userName, userPhone, city, activity, price, guideName, voucherId } = req.body;
    const newBooking = new Booking({
      userName,
      userPhone,
      city,
      activity,
      price,
      guideName,
      voucherId
    });
    await newBooking.save();
    console.log(`📌 New Booking saved: ${userName} -> ${activity} in ${city}`);
    res.status(201).json({ success: true, message: 'Booking saved to MongoDB', booking: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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

app.listen(PORT, () => {
  console.log(`🚀 Dekho Bharat backend running on http://localhost:${PORT}`);
});


