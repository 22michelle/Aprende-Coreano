import { Router } from "express";
import { verifyToken, checkUserRole } from "../middleware/auth.js";
import taskCtrl from "../controllers/taskController.js";

const router = new Router();

// Rutas para las tareas
router.post(
  "/tasks",
  verifyToken,
  checkUserRole(["teacher"]),
  taskCtrl.createTask
);
router.put(
  "/tasks/:taskId",
  verifyToken,
  checkUserRole(["teacher"]),
  taskCtrl.updateTask
);
router.delete(
  "/tasks/:taskId",
  verifyToken,
  checkUserRole(["teacher"]),
  taskCtrl.deleteTask
);
router.get("/tasks", verifyToken, taskCtrl.getAllTasksWithStatus);
router.get("/tasks/:taskId", verifyToken, taskCtrl.getTaskById);

export default router;
