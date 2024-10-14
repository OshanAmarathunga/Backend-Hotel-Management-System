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
    Room.find({available:true}).then((AvailableRoomList)=>{
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


export function deleteRoom(req,res){
    const roomId=req.params.roomId;

    Room.findOneAndDelete({roomId:roomId}).then((result)=>{
        if(!result){
            res.json({
                message:`Room id ${roomId} not found!`
            })
        }else{
            res.json({
                message:`Room Id ${roomId} deleted !`
            })
        }
    }).catch((e)=>{
        res.json({
            e
        })
    })
}


export function getRoomByCategory(req,res){
    const categoryName=req.params.categoryName;

    Room.find({category:categoryName}).then((result)=>{
        if(!result){
            res.json({
                message:"Not Found any room!"
            })
        }else{
            res.json({
                result
            })
        }
    }).catch((e)=>{
        res.json({
            e
        })
    })
}

export function updateRoom(req,res){
    const roomId=req.params.roomId;

    Room.updateOne({roomId:roomId},req.body).then((result)=>{
        if(!result){
            res.json({
                message:`Room id ${roomId} not found for update!`
            })
        }else{
            res.json({
                message:"Updated!"
            })
        }
    }).catch((e)=>{
        res.json({
            e
        })
    })
}