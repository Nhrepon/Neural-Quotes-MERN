
const multer = require('multer');
const path = require('path');
const FileModel = require("../model/FileModel");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 10000) + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).array('file', 12);

exports.fileUpload = async (req, res)=>{
    upload(req, res, async (err)=>{
        if(err){
            res.json({status: "failed", message:err});
        }else {
            const filePaths =await Promise.all(req.files.map(async (item, i)=>{
                let filePath = item.path.replace(/\\/g, '/');
                await FileModel.create({filePath:filePath});
                return {filePath:filePath};
            }));
            //const filePaths = req.files.map(file => path.posix.join(__dirname, file.path.replace(/\\/g, '/')));
            //const filePaths = req.files.map(file => path.posix.join('uploads', file.filename));

            //res.json({status:`success`, files:req.files, path:filePaths});
            res.json({status:`success`, path:filePaths});
        }
    })
}




exports.fileLoad = async (req, res)=>{
    try {
        const data =await FileModel.find().sort({ updatedAt : -1 });
        res.json({status:"success", file:data});
    }catch (e) {
        res.json({status:"failed", message:e});
    }
}



exports.fileDelete = async (req, res)=>{
    try {
        const {id} = req.params;
        const file = await FileModel.findOne({_id:id});
        const fileDirectory = path.join(__dirname, '../..', file.filePath);
        if (file) {
            fs.unlink(fileDirectory, (async (err) => {
                if (err){
                    res.json({status:"File delete failed from directory!", message:err});
                }
                else {
                    const data =await FileModel.deleteOne({_id: id});
                    res.json({status:"success", data:data});
                }
            }));
        }


    }catch (e) {
        res.json({status:"failed", message:e});
    }
}