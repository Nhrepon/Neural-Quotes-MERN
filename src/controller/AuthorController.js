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
        const data = await AuthorModel.find().sort({updatedAt: -1});
        res.json({status:"success", data: data});
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