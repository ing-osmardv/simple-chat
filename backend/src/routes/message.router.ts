import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const messageController = new MessageController();

router.get("/:id", (req, res) => messageController.getUserMessages(req, res));
router.post("", (req, res) => messageController.addMessage(req, res));

export default router;
