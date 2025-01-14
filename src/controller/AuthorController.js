const AuthorModel = require("../model/AuthorModel");
const CategoryModel = require("../model/CategoryModel");

exports.createAuthor = async (req, res) => {
    try{
        const reqBody = req.body;
        let author = await AuthorModel.find({name: reqBody.name});
        if(author.length >0){
            res.json({status:"duplicate", message:"Author name already exists. Please, try with new name."});
        }else {
            reqBody.createdBy = req.headers.userId;
            const data = await AuthorModel.create(req.body);
            res.json({status:"success", data: data});
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
            const data = await AuthorModel.updateOne({_id:id}, reqBody);
            return res.json({status:"success", data:data});
        }
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}




exports.deleteAuthor = async (req, res) => {
    try{
        const {id} = req.params;
        const data = await AuthorModel.deleteOne({_id: id});
        res.json({status:"success", data: data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}