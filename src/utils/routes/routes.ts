import express from "express";
import postsRoute from '../../modules/posts/router/posts.router';

const routes = express.Router();

routes.use('/posts', postsRoute);

export default routes;