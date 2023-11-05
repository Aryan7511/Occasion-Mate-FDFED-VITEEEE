import express from "express";
const router = express.Router();
import {
  registerVendor,
  loginVendor,
} from "../controllers/vendorControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

router.post("/register", registerVendor);
router.post("/login", loginVendor);

export default router;