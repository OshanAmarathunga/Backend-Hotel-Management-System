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