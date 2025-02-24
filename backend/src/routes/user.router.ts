import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/registered" ,(req, res) => userController.getUsersRegistered(req, res));

export default router;
