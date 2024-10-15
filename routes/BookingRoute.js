import express from "express";
import { createBooking, getBookingsBasedOnUserRole, updatBooking } from "../controllers/BoookingController.js";
const bookingRouter=express.Router();

bookingRouter.post('/',createBooking);
bookingRouter.get('/getBookings',getBookingsBasedOnUserRole);
bookingRouter.put('/:bookingId',updatBooking);

export default bookingRouter; 