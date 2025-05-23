import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from './entities/User';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Database connection
createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [User],
}).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.error("Database connection error:", error);
});

// Get all users
app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create user
app.post('/', async (req, res) => {
  try {
    const user = User.create(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Validate user credentials (used by Auth Service)
app.post('/validate', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.id.toString() !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error validating user' });
  }
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});