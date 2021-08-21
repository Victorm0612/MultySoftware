import { verifyToken, verifyBelongsToUser } from "../middlewares";
import { Router } from "express";
import { verifyToken } from "../jwt/functions";
const router = Router();

import {
  create,
  deleteUser,
  getBirthdayUser,
  getClientUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/user_controller";

//   /api/users/..
router.get("/", getUsers);
router.get("/birthday", getBirthdayUser);
router.get("/client", getClientUser);
router.get("/:id", getOneUser);
router.post("/register", verifyToken, create);
router.put("/:id", verifyBelongsToUser, updateUser);
router.delete("/:id", verifyBelongsToUser, deleteUser);

export default router;
