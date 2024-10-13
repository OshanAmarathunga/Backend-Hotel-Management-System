import Room from "../models/Room.js";

export function saveRoom(req,res){
    const reqUser=req.user;
    
    
    if(!reqUser){
        res.json({
            message:"Please login to create room!"
        });
        return
    }
    if(reqUser.type !="admin"){ 
        res.json({
            message:"Only Admin can create room!"
        });
        return
    }  

    const room=req.body;
    const newRoom=new Room(room);
    newRoom.save().then(
        (savedRoom)=>{
            res.json({ 
                message:"Room saved!"
            })
        }
    ).catch((e)=>{
        res.json({
            e
        })
    })



}

export function getAllRooms(req,res){
    Room.find().then((allRoomsList)=>{
        res.json({
            allRoomsList
        });
    }).catch((e)=>{
        res.json({
            e
        })
    })
}

export function getRoomById(req,res){
   const requiredRoomId=req.params.roomId;
   Room.findOne({roomId:requiredRoomId}).then((gotRoom)=>{
        res.json({
            gotRoom
        })
   }).catch((e)=>{
    res.json({
        e
    })
   })
}

export function getAllAvailabeRoomList(req,res){
    Room.find({status:"Available"}).then((AvailableRoomList)=>{
        res.json({
            AvailableRoomList
        })
    }).catch((e)=>{
        res.json({
            e
        })
    })
}

export function getRoomByName(req,res){
    const requireRoomName=req.params.roomName;
    Room.find({name:requireRoomName}).then((room)=>{
        res.json({
            room
        })
    }).catch((e)=>{
        res.json({
            e
        })
    })
}