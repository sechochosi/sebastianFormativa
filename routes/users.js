import { Router } from "express";
import { getMyProfile, getAllUsers } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/me", authenticate, getMyProfile);
router.get("/", authenticate, authorize("admin"), getAllUsers);

export default router;
