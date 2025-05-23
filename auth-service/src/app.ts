import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createConnection } from 'typeorm';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: ["src/entities/*.ts"],
}).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.error("Database connection error:", error);
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate credentials with User Service
    const userResponse = await fetch(`${process.env.USER_SERVICE_URL}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!userResponse.ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = await userResponse.json();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});