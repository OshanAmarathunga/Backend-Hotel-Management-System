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

    specialDescription:{
        type:String,
        default:""

    },

    maximumGuests:{
        type:Number,
        required:true
    },
    photo:[
        {
        type:String
        }
    ],
    available:{
        type:Boolean,
        required:true,
        default:true
    },
    category:{
        type:String,
        required:true
    },
    notes:{
        type:String
    }


})

const Room=mongoose.model("room",roomSchema)
export default Room;