const QuoteModel = require("../model/QuoteModel");
const QuoteMeta = require("../model/QuoteMeta");
const AuthorModel = require("../model/AuthorModel");
const CategoryModel = require("../model/CategoryModel");

exports.createQuote = async (req, res) => {
    try{
        const reqBody = req.body;
        let quote = await QuoteModel.find({quote: reqBody.quote});
        if(quote.length >0){
            res.json({status:"duplicate", message:"Quote already exists. Please, try with new qoute."});
        }else {
            reqBody.userId = req.headers.userId;
            const data = await QuoteModel.create(reqBody);
            const meta = {
                quoteId:data['_id'],
            }
            const quoteMeta = await QuoteMeta.create(meta);
            res.json({status:"success", data:data, meta:quoteMeta});
        }


    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}




exports.quoteList = async (req, res)=>{
    try{

        const joinWithCategory = {$lookup:{
                from: "categories",
                localField: "categoryId",
                foreignField:"_id",
                as: "category"
            }};
        const unWindCategory = {$unwind:"$category"};

        const joinWithAuthor = {$lookup:{
                from: "authors",
                localField: "authorId",
                foreignField:"_id",
                as: "author"
            }};
        const unWindAuthor = {$unwind:"$author"};

        const joinWithUser = {$lookup:{
                from: "profiles",
                localField: "userId",
                foreignField:"userId",
                as: "user"
            }};
        const unWindUser = {$unwind:"$user"};

        const projection = {$project:{
                'quote':1,
                'status':1,
                'categoryId':1,
                'authorId':1,
                'category.categoryName':1,
                'author.name':1,
                'user.userName':1,
                'updatedAt':1,
            }}

        const data = await QuoteModel.aggregate([
            joinWithCategory,
            unWindCategory,
            joinWithAuthor,
            unWindAuthor,
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



exports.singleQuote = async (req, res)=>{
    try{
        const {id} = req.params;
        const data = await QuoteModel.find({_id:id});
        res.json({status:"success", data:data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}


exports.updateQuote =  async (req, res) => {
    try{
        const {role,userId} = req.headers;
        const {id} = req.params;
        const reqBody = req.body;
        let quote = await QuoteModel.find({quote: reqBody.quote, _id:{$ne:id}});
        if(quote.length >0){
            res.json({status:"duplicate", message:"Quote already exists"});
        }else {
            const updateCondition = role === "admin" ? {_id:id} : {_id:id, userId:userId};

            const check = await QuoteModel.find(updateCondition);
            if(check.length === 0){
                return res.json({status:"fail", message:"You are not authorized to update this quote"});
            }else {
                const data = await QuoteModel.updateOne(updateCondition, reqBody);
                return res.json({status:"success", data:data});
            }

        }
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}


exports.deleteQuote = async (req, res)=>{
    try {
        const {role,userId} = req.headers;
        const {id} = req.params;

        const condition = role === "admin" ? {_id:id} : {_id:id, userId:userId};
        const check = await QuoteModel.find(condition);
        if(check.length === 0){
            return res.json({status:"fail", message:"You are not authorized to delete this quote"});
        }else {
            const data = await QuoteModel.deleteOne(condition);
            res.json({status:"success", data:data});
        }


    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}