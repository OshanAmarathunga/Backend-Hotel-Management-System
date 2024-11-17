import express from "express";
import { createBooking, deleteBooking, getAvailableRoomList, getBookingsBasedOnUserRole, updatBooking } from "../controllers/BoookingController.js";
import { getAllAvailabeRoomList } from "../controllers/RoomController.js";
const bookingRouter=express.Router();

bookingRouter.post('/',createBooking);
bookingRouter.get('/getBookings',getBookingsBasedOnUserRole);
bookingRouter.put('/:bookingId',updatBooking);
bookingRouter.post('/getAvailbleRooms',getAvailableRoomList);
bookingRouter.delete('/:BookingId', deleteBooking);

export default bookingRouter; 