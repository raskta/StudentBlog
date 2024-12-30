import express from "express";
import postsRoute from '../../modules/posts/router/posts.router';
import usersRoute from '../../modules/users/router/users.router';

const routes = express.Router();

routes.use('/posts', postsRoute);
routes.use('/users', usersRoute);

export default routes;