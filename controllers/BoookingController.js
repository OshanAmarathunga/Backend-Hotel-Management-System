import Booking from "../models/Booking.js";

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

// get identify cus or admin=> all booking, cus = >cus booking
//admin status change of booking
// can not crash booking dates with room id