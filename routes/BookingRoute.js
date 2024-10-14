import express from "express";
import { createBooking } from "../controllers/BoookingController.js";
const bookingRouter=express.Router();

bookingRouter.post('/',createBooking);

export default bookingRouter; 