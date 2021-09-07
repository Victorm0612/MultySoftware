import {
  verifyBelongsToUser,
  verifyAccess,
  passwordAccess,
} from "../middlewares";
import { Router } from "express";
const router = Router();

import {
  create,
  deleteUser,
  getBirthdayUser,
  getOneUser,
  getUsers,
  updateUser,
  updateUserStatus,
  updatePassword,
  resetPasswordEmail,
  resetPassword,
} from "../controllers/user_controller";

//   /api/users/..
router.get("/", verifyAccess, getUsers);
router.get("/birthday", verifyAccess, getBirthdayUser);
router.get("/:id", verifyBelongsToUser, getOneUser);
router.post("/register", verifyAccess, create);
router.put("/:id", verifyBelongsToUser, updateUser);
router.delete("/:id", verifyBelongsToUser, deleteUser);
router.put("/changeStatus/:id", verifyBelongsToUser, updateUserStatus);
router.put("/changePassword/:id", verifyBelongsToUser, updatePassword);
router.post("/resetPasswordEmail", resetPasswordEmail);
router.put("/resetPassword/:token", passwordAccess, resetPassword);

export default router;
