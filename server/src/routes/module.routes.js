import { Router } from "express";
import { verifyToken, checkUserRole } from "../middleware/auth.js";
import moduleCtrl from "../controllers/moduleController.js";

const router = new Router();

// Rutas para los módulos
router.post(
  "/modules",
  verifyToken,
  checkUserRole(["teacher"]),
  moduleCtrl.createModule
);
router.put(
  "/modules/:moduleId",
  verifyToken,
  checkUserRole(["teacher"]),
  moduleCtrl.updateModule
);
router.delete(
  "/modules/:moduleId",
  verifyToken,
  checkUserRole(["teacher"]),
  moduleCtrl.deleteModule
);
router.get("/modules", verifyToken, moduleCtrl.getAllModules);
router.get("/modules/:moduleId", verifyToken, moduleCtrl.getModuleById);

export default router;
