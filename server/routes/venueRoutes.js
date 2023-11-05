import express from "express";
const router = express.Router();
import {
  registerVenueOwner,
  loginVenueOwner
} from "../controllers/venueControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

router.post("/register", registerVenueOwner);
router.post("/login", loginVenueOwner);

export default router;