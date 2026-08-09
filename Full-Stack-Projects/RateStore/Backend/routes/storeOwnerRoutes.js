import { Router } from "express";
import {
	changeStoreOwnerPassword,
	getStoreOwnerProfile,
	loginStoreOwner,
	registerStoreOwner,
	updateStoreOwnerProfile
} from "../controllers/storeOwnerController.js";

const router = Router();

router.post("/register", registerStoreOwner);
router.post("/login", loginStoreOwner);
router.get("/:ownerId", getStoreOwnerProfile);
router.put("/:ownerId", updateStoreOwnerProfile);
router.put("/:ownerId/password", changeStoreOwnerPassword);

export default router;
