import mongoose from "mongoose";

const roomSchema=mongoose.Schema({
    roomId:{
        type:Number,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,

    },

    maximumGuests:{
        type:Number,
        required:true
    },
    photo:{
        type:String
    },
    status:{
        type:String,
        required:true,
        default:"Available"
    }


})

const Room=mongoose.model("room",roomSchema)
export default Room;