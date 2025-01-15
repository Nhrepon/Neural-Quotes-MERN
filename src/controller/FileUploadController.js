
const multer = require('multer');
const path = require('path');
const FileModel = require("../model/FileModel");
const fs = require('fs');
const sharp = require("sharp");
const QuoteModel = require("../model/QuoteModel");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 10000) + path.extname(file.originalname))
//     }
// })
// const upload = multer({ storage: storage, limits: { fileSize: 5*1024 * 1024 } }).array('file', 12); // limit 1mb
//
// exports.fileUpload = (req, res)=>{
//     upload(req, res, async (err)=>{
//         if(err){
//             res.json({status: "failed", message:err});
//         }else {
//             const filePaths =await Promise.all(req.files.map(async (item, i)=>{
//                 //console.log(item);
//
//                 //let filePath = item.path.replace(/\\/g, '/');
//                 let filePath ="uploads/" + item.filename;
//                 await FileModel.create({filePath:filePath});
//                 return {filePath:filePath};
//             }));
//             //const filePaths = req.files.map(file => path.posix.join(__dirname, file.path.replace(/\\/g, '/')));
//             //const filePaths = req.files.map(file => path.posix.join('uploads', file.filename));
//
//             //res.json({status:`success`, files:req.files, path:filePaths});
//             res.json({status:`success`, path:filePaths});
//         }
//     })
// }





// Multer storage setup (no disk storage since we will use memory)
const storage = multer.memoryStorage(); // Store files in memory for processing

// Multer configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).array('file', 12); // Allow up to 12 files

// File upload controller
exports.fileUpload = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: "failed", message: err });
        }

        try {
            const filePaths = await Promise.all(
                req.files.map(async (file) => {
                    const {categoryId} = req.body;
                    // Convert image buffer to WebP format
                    const webpBuffer = await sharp(file.buffer)
                        .webp({ quality: 90 }) // Convert to WebP with 90% quality
                        .toBuffer();

                    // Define the WebP file path
                    const outputFileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 10000)}.webp`;
                    const outputFilePath = path.join('./uploads', outputFileName);

                    // Write the WebP file to disk
                    fs.writeFileSync(outputFilePath, webpBuffer);

                    const filePath = outputFilePath.replace(/\\/g, '/');
                    // Save the file path to the database
                    return await FileModel.create({userId: req.headers.userId, filePath: filePath, categoryId: categoryId});
                })
            );

            // Respond with success and file paths
            res.json({ status: 'success', path: filePaths });
        } catch (e) {
            console.error("Error processing files:", e);
            res.status(500).json({ status: "failed", message: "File processing failed" });
        }
    });
};







exports.fileLoad = async (req, res)=>{
    try {
        const joinWithCategory = {$lookup:{
                from: "categories",
                localField: "categoryId",
                foreignField:"_id",
                as: "category"
            }};
        const unWindCategory = {$unwind:"$category"};

        const joinWithUser = {$lookup:{
                from: "profiles",
                localField: "userId",
                foreignField:"userId",
                as: "user"
            }};
        const unWindUser = {$unwind:"$user"};

        const projection = {$project:{
                'filePath':1,
                'category.categoryName':1,
                'user.userName':1,
                'createdAt':1,
                'updatedAt':1,
            }}

        const data = await FileModel.aggregate([
            joinWithCategory,
            unWindCategory,
            joinWithUser,
            unWindUser,
            projection,
            {$sort:{ updatedAt : -1 }}
        ]);

        res.json({status:"success", file:data});
    }catch (e) {
        res.json({status:"failed", message:e});
    }
}



exports.singleFile = async (req, res)=>{
    try{
        const {id} = req.params;
        const data = await FileModel.find({_id:id});
        return res.json({status:"success", data:data});
    }catch (e) {
        res.json({status:"error", message:e.message});
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