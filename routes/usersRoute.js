import express from "express";
import { getUsers,updateUser,saveUser,deleteUser, loginUser } from "../controllers/userController.js";
const userRouter=express.Router();

userRouter.get('/',getUsers);

userRouter.post('/',saveUser);

userRouter.put('/',updateUser);

userRouter.delete('/',deleteUser);
userRouter.post('/login',loginUser) 

export default userRouter;