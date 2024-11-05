import GalleryItem from "../models/gallaryItem.js"
import { isUserValidation } from "../Validation.js";

export function createGalleryItem(req,res){
    const user=req.user; 
    
    
    if (!isUserValidation(req)) {
        res.json({
          message: "Invalid login or user unauthorized!",
        });
        return;
      }
    

    const galleryItem=req.body

    const newGalleryItem=new GalleryItem(galleryItem);
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message:"Gallery item Created successfully!"
            })
        }
    ).catch(
        ()=>{
            res.status(200).json({
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
export function deleteGalleryItem(req,res){
    const id=req.params.id;
    GalleryItem.findByIdAndDelete(id).then(()=>{
        res.json({
            message:"Deleted !"
        })
    }).catch((e)=>{
        res.json({
            message:"Fail"
        })
    })
}

export function updateGalleyItem(req,res){
  
  const name=req.body.name;
  const galleryItem=req.body;

  console.log(name,galleryItem);
  
    GalleryItem.findOneAndUpdate({name:name},galleryItem).then((rsp)=>{
        console.log("ok");
        res.status(200).json({
            message:"Updated !"
        })
    }).catch((e)=>{ 
        res.json({
            message:"Fail"
        })
    })
}