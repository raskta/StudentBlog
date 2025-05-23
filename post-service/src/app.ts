import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Post } from './entities/Post';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Database connection
createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [Post],
}).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.error("Database connection error:", error);
});

// Get all posts
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create post
app.post('/', async (req, res) => {
  try {
    // Validate user with User Service
    const userResponse = await fetch(`${process.env.USER_SERVICE_URL}/${req.body.idusuario}`);
    if (!userResponse.ok) {
      return res.status(400).json({ message: 'Invalid user' });
    }

    const post = Post.create(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

app.listen(PORT, () => {
  console.log(`Post service running on port ${PORT}`);
});