import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/registered" ,(req, res) => userController.getUsersRegistered(req, res));

router.put("/join", (req, res) => userController.join(req, res));

export default router;
