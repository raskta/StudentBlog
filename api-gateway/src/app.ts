import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Auth Service Routes
app.use('/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '/'
  }
}));

// User Service Routes
app.use('/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/'
  }
}));

// Post Service Routes
app.use('/posts', createProxyMiddleware({
  target: process.env.POST_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/posts': '/'
  }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});