import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export function createBooking(req,res){
    

    if(req.user==null){
        res.json({
            message:"Please login to create booking!"
        });
        return
    }
    if(req.user.type!="customer"){
        res.json({
            message:"You are not a customer to create booking"
        });
        return
    }

    var startingID=1000;
    Booking.countDocuments().then((count)=>{
       const newID=startingID+count+1;
       const newBooking=new Booking({
        bookingId:newID,
        roomId:req.body.roomId,
        email:req.user.email,
        start:req.body.start,
        end:req.body.end,

       });

       newBooking.save().then((createdBooking)=>{
        res.json({
            createdBooking
        })
       }).catch((e)=>{
        res.json({
            e
        })
       })
    }).catch((e)=>{
        res.json({
            message:"booking number error!"
        })
    })
}

export function getBookingsBasedOnUserRole(req,res){
    if(req.user==null){
        res.json({
            message:"Please login to create booking!"
        });
        return
    }

    if(req.user.type=="customer"){
        const userEmail=req.user.email;

        Booking.find({email:userEmail}).then((bookings)=>{
            res.json({
                bookings
            })
        })
    }else{
        Booking.find().then((AllBookings)=>{
            res.json({
                AllBookings
            })
        })
    }
}


export function updatBooking(req,res){
    const bookingId=req.params.bookingId;
    
    Booking.updateOne({bookingId:bookingId},req.body).then((booking)=>{
        res.json({
            booking
        })
    }).catch((e)=>{
        res.json({
            e
        })
    })
}
