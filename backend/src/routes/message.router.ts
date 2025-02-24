import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const messageController = new MessageController();

router.post("/",  messageController.addMessage);
router.get("/:sender/:receiver",  messageController.getUserMessages);

export default router;
