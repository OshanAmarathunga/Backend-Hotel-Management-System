import express from "express";
import {
  getUsers,
  updateUser,
  saveUser,
  deleteUser,
  loginUser,
  getUser,
  googleLogin,
  sendEmail,
  validateOtp,
} from "../controllers/userController.js";
import User from "../models/user.js";
const userRouter = express.Router();

userRouter.post("/", getUsers);
userRouter.post("/saveuser", saveUser);
userRouter.put("/", updateUser);
userRouter.delete("/:email", deleteUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-user", getUser);
userRouter.post("/googleLogin/:token", googleLogin);
userRouter.post("/email", sendEmail);
userRouter.post("/veryfy-email", validateOtp);

export default userRouter;
