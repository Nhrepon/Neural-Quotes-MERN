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
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let keyword = req.params.keyword;
        let skip = (pageNo-1)*perPage;

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
            }};

        let data;
        let searchQuery;
        if(keyword !== "0"){
            let searchRegex = {"$regex":keyword, "$options":"i"};
            searchQuery = {$or:[{categoryName:searchRegex}, {categoryDesc:searchRegex}]};

            data = await CategoryModel.aggregate([

                {
                    $facet:{
                        total:[{$count:"total"}],
                        data:[
                            joinWithUser,
                            unWindUser,
                            projection,
                            {$match:searchQuery},
                            {$sort:{ updatedAt : -1 }},
                            {$skip:skip},
                            {$limit:perPage},
                        ]
                    }
                }

                // {$facet:{
                // Total:[{$match:searchQuery}, {$count:"total"}],
                //     Rows:[{$match:searchQuery},{$skip:skip}, {$limit:perPage}],
                // }},


                //{$count:"total"},

            ]);

        }else{
            data = await CategoryModel.aggregate([
                {
                    $facet:{
                        total:[{$count:"total"}],
                        data:[
                            joinWithUser,
                            unWindUser,
                            projection,
                            {$sort:{ updatedAt : -1 }},
                            {$skip:skip},
                            {$limit:perPage},
                        ]
                    }
                }

            ]);
        }
        return res.json({status:"success", total:data[0].total[0].total, load:data[0].data.length, data:data[0].data});
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



exports.categoryWithQuotes = async (req, res)=>{
    try{
        const categoriesWithQuotes = await CategoryModel.aggregate([
            {
                $match: {
                    categoryName: { $ne: "Uncategorized" }, // Filter out "Uncategorized"
                },
            },
            {
                // $lookup: {
                //     from: "quotes",
                //     localField: "_id",
                //     foreignField: "categoryId",
                //     as: "quotes",
                // },
                $lookup: {
                    from: "quotes",
                    let: { categoryId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$categoryId", "$$categoryId"] },
                                status: "published", // Filter quotes by status
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                quote: 1,
                                // Add other quote fields you want to include
                            },
                        },
                    ],
                    as: "quotes",
                },


            },
            {
                $match: {
                    "quotes.0": { $exists: true }, // Filter categories with at least one quote
                },
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    categoryDesc: 1,
                    categoryImg: 1,
                    //createdBy: 1,
                    //createdAt: 1,
                    updatedAt: 1,
                    quoteCount: {$size: "$quotes"} //add a quote count property
                },
            },
        ]);
        return res.json({status:"success", data:categoriesWithQuotes});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}