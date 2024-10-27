import express from "express";
import { getUsers,updateUser,saveUser,deleteUser, loginUser, getUser } from "../controllers/userController.js";
const userRouter=express.Router();

userRouter.get('/',getUsers);

userRouter.post('/',saveUser);

userRouter.put('/',updateUser);

userRouter.delete('/',deleteUser);
userRouter.post('/login',loginUser);
userRouter.get("/get-user",getUser);

export default userRouter;