import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import userCtrl from "../controllers/UserController.js";

const router = new Router();

// Public routes
router.post("/register", verifyToken, userCtrl.register);
router.post("/login", verifyToken, userCtrl.login);
router.get("/token/:token", verifyToken, userCtrl.getUserByToken);

// Private routes
router.get("/:userId", verifyToken, userCtrl.getUserById);
router.get("/email/:email", verifyToken, userCtrl.getUserByEmail);
router.delete("/:email", verifyToken, userCtrl.deleteUser);
router.put("/:email", verifyToken, userCtrl.updateUser);
router.get("/", verifyToken, userCtrl.getAllUsers);

export default router;
