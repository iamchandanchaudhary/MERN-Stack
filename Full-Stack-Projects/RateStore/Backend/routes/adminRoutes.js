import { Router } from "express";
import {
	deleteRegisteredStoreOwner,
	deleteRegisteredUser,
	deleteStoreAsAdmin,
	listRegisteredStoreOwners,
	listRegisteredUsers,
	loginAdmin
} from "../controllers/adminController.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/users", listRegisteredUsers);
router.get("/store-owners", listRegisteredStoreOwners);
router.delete("/users/:userId", deleteRegisteredUser);
router.delete("/store-owners/:ownerId", deleteRegisteredStoreOwner);
router.delete("/stores/:storeId", deleteStoreAsAdmin);

export default router;
