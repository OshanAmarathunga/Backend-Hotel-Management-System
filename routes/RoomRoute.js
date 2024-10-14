import express from "express";
import { deleteRoom, getAllAvailabeRoomList, getAllRooms, getRoomByCategory, getRoomById, getRoomByName, saveRoom } from "../controllers/RoomController.js";
import { getCategoryByName } from "../controllers/CategoryController.js";

const roomRouter=express.Router();

roomRouter.post('/',saveRoom);
roomRouter.get('/',getAllRooms);
roomRouter.get('/getRoomById/:roomId',getRoomById);
roomRouter.get('/getAvailableRoomList',getAllAvailabeRoomList);
roomRouter.get('/getRoomByName/:roomName',getRoomByName);
roomRouter.delete('/:roomId', deleteRoom);
roomRouter.get('/getRoomByCategory/:categoryName',getRoomByCategory );

export default roomRouter;