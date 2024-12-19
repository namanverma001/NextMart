import express from "express";
import {
    registerController,
    loginController,
    // testController,
} from "../controllers/authController.js";
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

// Router object
const router = express.Router();

// Routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// Export router
export default router;

//test routes
// router.get("/test", requireSignIn, isAdmin, testController);
