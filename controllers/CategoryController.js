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

export function deleteCategory(req,res){
    if(req.user==null){
        res.json({
            message:"Unauthorized user for category delete!"
        })
    }
    if(req.user.type !="admin"){
        res.json({
            message:"You dont have access to delete category!"
        })
    }

    const name=req.params.categoryName
    category.findOneAndDelete({name:name}).then(
        (result)=>{
            if(!result){
                res.json({
                    message:`Not found this category - ${name}`
                 })
            }else{
                res.json({
                    message:`categoet ${name} deleted !`
                 })
            }
        }
    ).catch((e)=>{
        res.json({
            message:e
        })
    })
}

export function getCategoryByName(req,res){
    const requiredName=req.params.requiredName

    category.findOne({name:requiredName}).then(
        (result)=>{
            res.json({
                result
            })
        }
    ).catch(()=>{
        res.json({
            e
        })
    })
}