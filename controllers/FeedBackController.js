import Feedback from "../models/Feedback.js";


export function saveFeedback(req,res){
    const feedback=req.body;
    
    const newFeedback=new Feedback(feedback);
    newFeedback.save().then((rsp)=>{
        
        res.status(200).json({
            
            
            message:"Feedback Saved !"
        })
    }).catch((e)=>{
        console.log(e);
        
        res.status(400).json({
            message:"Failed to save"
        })
    })
}

export function getAllFeedbacks(req,res){
    Feedback.find().then((rsp)=>{
        res.status(200).json({
            allFeedBacks:rsp
        })
    }).catch((e)=>{
        res.status(400).json({
            e
        })
    })
}

export function getApprovedFeedbacks(req,res){
    Feedback.find({status:"Approved"}).then((rsp)=>{
        res.status(200).json({
            ApprovedFeedbacks:rsp
        })
    }).catch((e)=>{
        res.status(400).json({
            e
        })
    })
}