const AuthorModel = require("../model/AuthorModel");
const QuoteModel = require("../model/QuoteModel");
const {isAdmin} = require("../utility/ValidationUtility");

exports.createAuthor = async (req, res) => {
    try{
        const reqBody = req.body;
        let author = await AuthorModel.find({name: reqBody.name});
        if(author.length >0){
            res.json({status:"duplicate", message:"Author name already exists. Please, try with new name.", data:author[0]});
        }else {
            if(isAdmin(req.headers.token || req.cookies.token)){
                reqBody.createdBy = req.headers.userId;
                const data = await AuthorModel.create(req.body);
                res.json({status:"success", data: data});
            }else {
                res.json({status:"failed", message:"You are not authorized to process this operation!"});
            }
        }

    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}


exports.authorList = async (req, res) => {
    try{
        let pageNo = Number(req.query.pageNo) || 1;
        let perPage = Number(req.query.perPage) || 10;
        let skip = (pageNo-1)*perPage;
        const projection = {$project:{
                'name':1,
                'bio':1,
                'profilePicture':1,
                'authorId':1,
                'nationality':1,
                'createdAt':1,
                'updatedAt':1,
            }}
        //const data = await AuthorModel.find().sort({updatedAt: -1});
        const data = await AuthorModel.aggregate([
            {
                $facet:{
                    total:[{$count:"total"}],
                    data:[
                        projection,
                        {$sort:{ updatedAt : -1 }},
                        {$skip:skip},
                        {$limit:perPage},
                    ]
                }
            }
        ]);

        //res.json({status:"success", data: data});
        res.json({status:"success", total:data[0].total[0].total, load:data[0].data.length, data:data[0].data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}



exports.updateAuthor = async (req, res) => {
    try{
        const {id} = req.params;
        const reqBody = req.body;
        let author = await AuthorModel.find({name: reqBody.name, _id:{$ne:id}});
        if(author.length >0){
            res.json({status:"duplicate", message:"Author already exists"});
        }else {
            if(isAdmin(req.headers.token || req.cookies.token)){
                const data = await AuthorModel.updateOne({_id:id}, reqBody);
                return res.json({status:"success", data:data});
            }else {
                res.json({status:"failed", message:"You are not authorized to process this operation!"});
            }

        }
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}




exports.deleteAuthor = async (req, res) => {
    try{
        const {id} = req.params;
        const [quoteRef] = await Promise.all([
            QuoteModel.find({authorId:id}),
        ]);
        if(quoteRef.length > 0 ){
            res.json({status:"failed", message:"This author is referenced in another collection and cannot be deleted."});
        }else {
            if(isAdmin(req.headers.token || req.cookies.token)){
                const data = await AuthorModel.deleteOne({_id: id});
                res.json({status: "success", data: data});
            }else {
                res.json({status:"failed", message:"You are not authorized to process this operation!"});
            }

        }
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}