import mongoose from "mongoose";

const FeedbackSchema=mongoose.Schema({
    rate:{
        type:Number,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Feedback=mongoose.model("Feedback",FeedbackSchema);
export default Feedback;