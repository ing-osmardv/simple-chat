import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const messageController = new MessageController();

router.post("", (req, res) => messageController.addMessage(req, res));
router.get("/:sender/:receiver", (req, res) => messageController.getUserMessages(req, res));

export default router;
