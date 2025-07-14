import { Router } from "express";
import { login } from "../controllers/authController.js";
import validate from "../middleware/validation.js";
import { loginSchema } from "../utils/validators.js";

const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;
