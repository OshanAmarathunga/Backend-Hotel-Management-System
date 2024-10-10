import { type } from "express/lib/response";
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
        type:Decimal, 
        required:true
    }
})

const categoryItem=mongoose.model("CategoryItem",categorySchema);
export default categoryItem;