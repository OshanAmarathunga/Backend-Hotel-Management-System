import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String 
    },
    price:{
        type:Number,  
        required:true 
    }
    
})

const category=mongoose.model("Category",categorySchema);
export default category;