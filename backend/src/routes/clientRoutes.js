import express from "express";
import { addClient, getClients, getClientById, updateClient, deleteClient } from "../controllers/clientController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addClient);
router.get("/", authMiddleware, getClients);
router.get("/:id", authMiddleware, getClientById);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

export default router;