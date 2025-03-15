const QuoteModel = require("../model/QuoteModel");
const QuoteMeta = require("../model/QuoteMeta");
const FileModel = require("../model/FileModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createQuote = async (req, res) => {
    try{
        const reqBody = req.body;
        let quote = await QuoteModel.find({quote: reqBody.quote});
        if(quote.length >0){
            res.json({status:"duplicate", message:"Quote already exists. Please, try with new quote."});
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

        let pageNo = Number(req.query.pageNo) || 1;
        let perPage = Number(req.query.perPage) || 10;
        let skip = (pageNo-1)*perPage;
        let status = req.query.status || "published";

        const matchStage = {$match: {status:status}};

        const joinWithCategory = {$lookup:{
                from: "categories",
                localField: "categoryId",
                foreignField:"_id",
                as: "category",
                pipeline: [{$project:{categoryName:1}}]
            }};
        const unWindCategory = {$unwind:"$category"};

        const joinWithAuthor = {$lookup:{
                from: "authors",
                localField: "authorId",
                foreignField:"_id",
                as: "author",
                pipeline: [{$project:{name:1}}]
            }};
        const unWindAuthor = {$unwind:"$author"};

        const joinWithUser = {$lookup:{
                from: "profiles",
                localField: "userId",
                foreignField:"userId",
                as: "user",
                pipeline: [{$project:{userName:1}}]
            }};
        const unWindUser = {$unwind:"$user"};

        const joinWithMeta = {$lookup:{
                from: "quotemetas",
                localField: "_id",
                foreignField:"quoteId",
                as: "meta",
                pipeline: [{$project:{likes:1, views:1, sharedCount:1}}]
            }};
        const unWindMeta = {$unwind:"$meta"};

        const projection = {$project:{
                quote:1,
                status:1,
                categoryId:1,
                authorId:1,
                'category.categoryName':1,
                'author.name':1,
                'user.userName':1,
                createdAt:1,
                updatedAt:1,
                'meta.likes':1,
                'meta.views':1,
                'meta.sharedCount':1
            }}

        const data = await QuoteModel.aggregate([
            {
                $facet:{
                    total:[matchStage,{$count:"total"}],
                    data:[
                        matchStage,
                        joinWithCategory,
                        unWindCategory,
                        joinWithAuthor,
                        unWindAuthor,
                        joinWithUser,
                        unWindUser,
                        joinWithMeta,
                        unWindMeta,
                        projection,
                        {$sort:{ updatedAt : -1 }},
                        {$skip:skip},
                        {$limit:perPage},
                    ]
                }
            }
        ]);
        //return res.json({status:"success", data:data});
        return res.json({status:"success", total:data[0].total[0].total, load:data[0].data.length, data:data[0].data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}


exports.singleQuote = async (req, res)=>{
    try{
        const id = new ObjectId(req.params.id);

        const matchStage = {$match:{_id:id}};

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
        const joinWithMeta = {$lookup:{
                from: "quotemetas",
                localField: "_id",
                foreignField:"quoteId",
                as: "meta"
            }};
        const unWindMeta = {$unwind:"$meta"};

        const projection = {$project:{
                'quote':1,
                'status':1,
                'categoryId':1,
                'authorId':1,
                'userId':1,
                'category.categoryName':1,
                'author.name':1,
                'user.userName':1,
                'updatedAt':1,
                'meta.likes':1,
                'meta.views':1,
                'meta.sharedCount':1
            }}

        const data = await QuoteModel.aggregate([
            matchStage,
            joinWithCategory,
            unWindCategory,
            joinWithAuthor,
            unWindAuthor,
            joinWithUser,
            unWindUser,
            joinWithMeta,
            unWindMeta,
            projection
        ]);

        // const img = await FileModel.find({categoryId:data[0].categoryId}, {filePath:1})
        //     .sort({ $rand: Math.random() })
        //     .limit(1);

        let img = await FileModel.aggregate([
            { $match: { categoryId: data[0].categoryId } },
            { $project: { filePath: 1 } },
            { $sample: { size: 1 } }
        ]);
        if(img.length === 0 || data[0].category.categoryName === "Uncategorized"){
            img = await FileModel.aggregate([
                { $project: { filePath: 1 } },
                { $sample: { size: 1 } }
            ]);
        }

        await QuoteMeta.updateOne({quoteId:id}, {$inc:{views:1}});
        res.json({status:"success", data:data, image:img});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}

exports.quoteMeta = async (req, res)=>{
    try{
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;
        const data = await QuoteMeta.updateOne({quoteId:id}, {$inc:{sharedCount:reqBody.sharedCount, likes:reqBody.likes}});
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


exports.quoteListForBanner = async (req, res)=>{
    try{
        const matchStage = {$match: {status:"published"}};
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


        const projection = {$project:{
                'quote':1,
                'status':1,
                'categoryId':1,
                'authorId':1,
                'userId':1,
                'author.name':1,
                'category.categoryName':1,
                'createdAt':1,
                'updatedAt':1,
            }}
        let image;

        const data = await QuoteModel.aggregate([
            matchStage,
            joinWithCategory,
            unWindCategory,
            joinWithAuthor,
            unWindAuthor,
            projection,
            {$sample:{size:5}},
            {$sort:{updatedAt:-1}},
            {$limit: 5},
        ]);

        const quotesWithImages = await Promise.all(data.map(async (quote) => {
            let image;
            try {
                image = await FileModel.aggregate([
                    { $match: { categoryId: quote.categoryId } },
                    { $project: { filePath: 1 } },
                    { $sample: { size: 1 } }
                ]);
                if (image.length === 0 || quote.category.categoryName === "Uncategorized") {
                    image = await FileModel.aggregate([
                        { $project: { filePath: 1 } },
                        { $sample: { size: 1 } }
                    ]);
                }
                return { ...quote, image: image[0]?.filePath || null };
            } catch (imageError) {
                console.error("Error fetching image:", imageError);
                return { ...quote, image: null };
            }
        }));

        res.json({status:"success", data:quotesWithImages});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}

