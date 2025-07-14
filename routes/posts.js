import { Router } from "express";
import { createPost, getAllPublishedPosts, getMyPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", getAllPublishedPosts);

router.post("/", authenticate, createPost);
router.get("/my", authenticate, getMyPosts);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, authorize("admin", "teacher"), deletePost);

export default router;
