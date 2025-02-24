import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("", userGuard ,(req, res) => userController.getUsers(req, res));

export default router;
