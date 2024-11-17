import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export function createBooking(req, res) {
  if (req.user == null) {
    res.json({
      message: "Please login to create booking!",
    });
    return;
  }
  if (req.user.type != "Customer") {
    res.status(404).json({
      message: "You are not a customer to create booking",
    }); 
    return;
  }

  const startDate = req.body.start;
  const endDate = req.body.end;
  const roomId = req.body.roomId;

  Booking.find({
    roomId: roomId,
    $or: [{ start: { $lt: endDate }, end: { $gt: startDate } }],
  })
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: "Room is not available for the selected dates.",
        });
      } else {
        var startingID = 1000;
        Booking.countDocuments()
          .then((count) => {
            const newID = startingID + count + 1;
            const newBooking = new Booking({
              bookingId: newID,
              roomId: req.body.roomId,
              email: req.user.email,
              start: req.body.start,
              end: req.body.end,
            });

            newBooking
              .save()
              .then((createdBooking) => {
                res.json({
                  createdBooking,
                });
              })
              .catch((e) => {
                res.json({
                  e,
                });
              });
          })
          .catch((e) => {
            res.json({
              message: "booking number error!",
            }); 
          });
      }
    })
    .catch((e) => {});
}

export function getBookingsBasedOnUserRole(req, res) {
  if (req.user == null) {
    res.json({
      message: "Please login to create booking!",
    });
    return;
  }
  // req.user.type == "customer"

  if (true) {
    const userEmail = req.user.email; 

    Booking.find({ email: userEmail }).then((bookings) => {
      res.json({
        bookings,
      });
    });
  } else {
    Booking.find().then((AllBookings) => {
      res.json({
        AllBookings,
      });
    });
  }
}

export function updatBooking(req, res) {
  const bookingId = req.params.bookingId;

  Booking.updateOne({ bookingId: bookingId }, req.body)
    .then((booking) => {
      res.json({
        booking,
      });
    })
    .catch((e) => {
      res.json({
        e,
      });
    });
}

export function getAvailableRoomList(req,res){
  const startDate = req.body.start;
  const endDate = req.body.end; 
  const category =req.body.category;
  

  Booking.find({
    $or: [{ start: { $lte: endDate }, end: { $gte: startDate } }],
  }).then((rsp)=>{
    const rooms=[];
    for(let i=0;i<rsp.length;i++){
      rooms.push(rsp[i].roomId)
    }
    Room.find({
      roomId:{
        $nin:rooms
      } ,
      category:category

    }).then((rst)=>{
        res.json({
          rst
          
        })
      
      
    })
  })
}

  export function deleteBooking(req,res){
    const id=req.params.BookingId;
    
    Booking.findOneAndDelete({bookingId:id})
    .then((deletedBooking) => {
      if (!deletedBooking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }
      res.status(200).json({
        message: "Booking deleted successfully",
        data: deletedBooking,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting booking",
        
      });
    });
    
  }
