import express from "express";
import postsRoute from "../../modules/posts/router/posts.router";
import usersRoute from "../../modules/users/router/users.router";
import authRoute from "../../modules/auth/routes/auth.routes";
import uploadImage from "../../modules/uploadImage/router/uploadImage.router";

const routes = express.Router();

routes.use("/posts", postsRoute);
routes.use("/users", usersRoute);
routes.use("/auth", authRoute);
routes.use("/upload", uploadImage);

export default routes;
