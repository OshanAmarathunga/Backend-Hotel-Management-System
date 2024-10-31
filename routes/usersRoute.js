import express from "express";
import { getUsers,updateUser,saveUser,deleteUser, loginUser, getUser, googleLogin } from "../controllers/userController.js";
import User from "../models/user.js";
const userRouter=express.Router();

userRouter.get('/',getUsers);

userRouter.post('/',saveUser);

userRouter.put('/',updateUser);

userRouter.delete('/:email',deleteUser);
userRouter.post('/login',loginUser);
userRouter.get("/get-user",getUser);
userRouter.post("/googleLogin/:token",googleLogin)

export default userRouter;