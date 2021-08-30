import { verifyToken, verifyBelongsToUser, verifyAccess } from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  create,
  deleteUser,
  getBirthdayUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/user_controller";

//   /api/users/..
router.get("/", [verifyToken, verifyAccess], getUsers);
router.get("/birthday", [verifyToken, verifyAccess], getBirthdayUser);
router.get("/:id", [verifyToken, verifyBelongsToUser], getOneUser);
router.post("/register", [verifyToken, verifyAccess], create);
router.put("/:id", [verifyToken, verifyBelongsToUser], updateUser);
router.delete("/:id", [verifyToken, verifyAccess], deleteUser);

export default router;
