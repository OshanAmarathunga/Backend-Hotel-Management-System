import express from "express";
import { getAllAvailabeRoomList, getAllRooms, getRoomById, getRoomByName, saveRoom } from "../controllers/RoomController.js";
import { getCategoryByName } from "../controllers/CategoryController.js";

const roomRouter=express.Router();

roomRouter.post('/',saveRoom);
roomRouter.get('/',getAllRooms);
roomRouter.get('/getRoomById/:roomId',getRoomById);
roomRouter.get('/getAvailableRoomList',getAllAvailabeRoomList);
roomRouter.get('/getRoomByName/:roomName',getRoomByName);

export default roomRouter;