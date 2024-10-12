import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String 
    },
    price:{
        type:Number,  
        required:true 
    },
    features:[
        {
            type:String
        }
    ],
    image:{
        type:String
    }    
})

const category=mongoose.model("Category",categorySchema);
export default category;