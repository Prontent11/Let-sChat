import { Router } from "express";
import { getConversation } from "../controller/messageController.js";




const router = Router();


router.get('/:userId',getConversation);

export default router;