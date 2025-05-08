// server.js (or index.js)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/securitydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Personnel Schema
const personnelSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  email: String,
  phone: String,
  address: String,
  joinDate: String,
  role: String,
  status: { type: String, default: 'active' },
  password: String,
  image: String,
});

const Personnel = mongoose.model('Personnel', personnelSchema);

// Express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// List all personnel
app.get('/api/personnel', async (req, res) => {
  const personnel = await Personnel.find().sort({ joinDate: -1 });
  res.json(personnel);
});

//Register new personnel
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Personnel.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // Don't return the password
  const { password: _, ...userData } = user.toObject();
  res.json(userData);
});

// Register new personnel
app.post('/api/personnel', async (req, res) => {
  try {
    const {
      name,
      employeeId,
      email,
      phone,
      address,
      joinDate,
      role,
      password,
    } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newPersonnel = new Personnel({
      name,
      employeeId,
      email,
      phone,
      address,
      joinDate,
      role,
      password: hashedPassword,
      status: 'active',
      image: '',
    });

    await newPersonnel.save();
    // Don't return the hashed password
    const { password: _, ...personData } = newPersonnel.toObject();
    res.status(201).json(personData);
  } catch (err) {
    res.status(400).json({ error: 'Failed to register personnel' });
  }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
