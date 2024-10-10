import GalleryItem from "../models/gallaryItem.js"

export function createGalleryItem(req,res){
    const user=req.user;  
    // sample
     
    if(user==null){
        res.status(403).json({
            message:"Unauthorized!, Please login to create galley item!"
        });
        return;
        
    }  

    if(user.type!="admin"){
        res.status(403).json({
            message:"Unauthorized!, Please login to create galley item!"
        });
        return;
    }
    

    const galleryItem=req.body.item

    const newGalleryItem=new GalleryItem(galleryItem);
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message:"Gallery item Created successfully!"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message:"gallery item creation failed!"
            })
        }
    )
};


export function getGallery(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list:list
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"empty list"
            })
        }
    )
}