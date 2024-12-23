import { Request, Response, Router } from "express";
import { PostsController } from "./posts/posts.controller";
import { UsersController } from "./users/users.controller";
import { sessionMiddleware } from "./middleware/sessionCheck";

export const router = Router();

const postController = new PostsController();
const userController = new UsersController();

//^ Posts
router.get("/post", sessionMiddleware, postController.list);
router.post("/post", sessionMiddleware, postController.create);
router.put("/post/:id", sessionMiddleware, postController.update);
router.delete("/post/:id", sessionMiddleware, postController.remove);

//^ Session
router.post("/session", userController.createSession);
