import category from "../models/Category.js";


export function getAllCategories(req,res){
    category.find().then(
        (userList)=>{
            if(userList.length==0){
                res.status(400).json({
                    message:"No categories available!"
                })
            }else{
                res.status(200).json({
                    userList
                })
            }
        }
    ).catch((e)=>{
        res.status(400).json({
            message:`Error of retriving data from database ${e}`
        })
    })
}

export function saveCategory(req,res){
    const reqUser=req.user

    if(!reqUser){
        res.status(400).json({
            message:"Unauthorized login!"
        });
        return;
    }
    console.log(reqUser); 
    
    if(reqUser.type!="admin"){
        res.status(400).json({
            message:"You dont have access to save category!"
        });
        return
    }

    const saveCategory=req.body.item;
    const newCategory=new category(saveCategory);
    newCategory.save().then(
        (savedCategory)=>{
            res.json({
                message:"New Category Created!",
                savedCategory
            })
        }
    ).catch((e)=>{
        res.json({
            message:"Category save fail!",
            error:e
        })
    })


}