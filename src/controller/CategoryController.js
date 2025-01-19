const CategoryModel = require("../model/CategoryModel");
const FileModel = require("../model/FileModel");
const QuoteModel = require("../model/QuoteModel");
const {isAdmin} = require("../utility/ValidationUtility");


exports.createCategory = async (req, res)=> {
    try {
        const reqBody = req.body;
        let cat = await CategoryModel.find({categoryName: reqBody.categoryName});
        if(cat.length >0){
            res.json({status:"duplicate", message:"Category already exists"});
        }else {
            if(isAdmin(req.headers.token || req.cookies.token)){
                reqBody.createdBy = req.headers.userId;
                const data = await CategoryModel.create(reqBody);
                return res.json({status:"success", data: data});
            }else {
                return res.json({status:"failed", message:"You are not authorized to process this operation!"});
            }
        }
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}


exports.categoryList = async (req, res)=>{
    try{
        const joinWithUser = {$lookup:{
                from: "profiles",
                localField: "createdBy",
                foreignField:"userId",
                as: "user"
            }};
        const unWindUser = {$unwind:"$user"};
        const projection = {$project:{
                'categoryName':1,
                'categoryDesc':1,
                'categoryImg':1,
                'createdAt':1,
                'updatedAt':1,
                'user.userName':1,
            }}

        const data = await CategoryModel.aggregate([
            joinWithUser,
            unWindUser,
            projection,
            {$sort:{ updatedAt : -1 }}
        ]);
        return res.json({status:"success", data:data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}

exports.updateCategory = async (req, res)=>{
    try {
        const {id} = req.params;
        const reqBody = req.body;
        let cat = await CategoryModel.find({categoryName: reqBody.categoryName, _id:{$ne:id}});
        if(cat.length >0){
            res.json({status:"duplicate", message:"Category already exists"});
        }else {
            if(isAdmin(req.headers.token || req.cookies.token)){
                const data = await CategoryModel.updateOne({_id:id}, reqBody);
                return res.json({status:"success", data:data});
            }else {
                return res.json({status:"failed", message:"You are not authorized to process this operation!"});
            }
        }

    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}





exports.deleteCategory = async (req, res)=>{
    try {
    const {id} = req.params;
        const [quoteRef, categoryRef] = await Promise.all([
            QuoteModel.find({categoryId:id}),
            FileModel.find({categoryId:id}),
        ])
        if(quoteRef.length > 0 || categoryRef.length > 0){
            res.json({status:"failed", message:"This category is referenced in another collection and cannot be deleted."});
        }else{
        if(isAdmin(req.headers.token || req.cookies.token)){
            const data = await CategoryModel.deleteOne({_id:id});
            res.json({status:"success", data:data});
        }else {
            return res.json({status:"failed", message:"You are not authorized to process this operation!"});
        }
    }

    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}