
const multer = require('multer');
const path = require('path');
const FileModel = require("../model/FileModel");
const fs = require('fs');
const sharp = require("sharp");
const CategoryModel = require("../model/CategoryModel");
const AuthorModel = require("../model/AuthorModel");
const {isAdmin} = require("../utility/ValidationUtility");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
// exports.fileUpload = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.json({ status: "failed", message: err });
//         }
//
//         try {
//             const filePaths = await Promise.all(
//                 req.files.map(async (file) => {
//                     const {categoryId} = req.body;
//                     // Convert image buffer to WebP format
//                     const webpBuffer = await sharp(file.buffer)
//                         .webp({ quality: 90 }) // Convert to WebP with 90% quality
//                         .toBuffer();
//
//                     // Define the WebP file path
//                     const outputFileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 10000)}.webp`;
//                     const outputFilePath = path.join('./uploads', outputFileName);
//
//                     // Write the WebP file to disk
//                     fs.writeFileSync(outputFilePath, webpBuffer);
//
//                     const filePath = outputFilePath.replace(/\\/g, '/');
//                     // Save the file path to the database
//                     return await FileModel.create({userId: req.headers.userId, filePath: filePath, categoryId: categoryId});
//                 })
//             );
//
//             // Respond with success and file paths
//             res.json({ status: 'success', path: filePaths });
//         } catch (e) {
//             console.error("Error processing files:", e);
//             res.status(500).json({ status: "failed", message: "File processing failed" });
//         }
//     });
// };




exports.fileUpload = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ status: "failed", message: err });
        }

        const uploadedFiles = [];
        const savedFiles = [];

        try {
            let {categoryId} = req.body;
            let categoryName = "NHRepon";

            if(Array.isArray(categoryId)){
                categoryId = categoryId[0];
                let categoryData = await CategoryModel.findOne({ _id: categoryId });
                categoryName = categoryData.categoryName;
            }else{
                let categoryData = await CategoryModel.findOne({ _id: categoryId });
                categoryName = categoryData.categoryName;
            }
            // Ensure upload directory exists
            const uploadDir = './uploads';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            for(const file of req.files){
                try {
                    // Convert image buffer to WebP
                    const webpBuffer = await sharp(file.buffer)
                        .webp({ quality: 90 }) // Convert to WebP with 90% quality
                        .toBuffer();

                    // Define file name and path
                    const outputFileName = `${categoryName}-${Date.now()}-${Math.round(Math.random() * 10000)}-neural-quotes-by-NHRepon.webp`;
                    const outputFilePath = path.join(uploadDir, outputFileName);

                    // Write WebP file to disk
                    fs.writeFileSync(outputFilePath, webpBuffer);
                    uploadedFiles.push(outputFilePath);

                    const filePath = outputFilePath.replace(/\\/g, '/');

                    // Save file metadata to the database
                    const savedFile = await FileModel.create({userId: req.headers.userId, filePath: filePath, categoryId: categoryId});
                    savedFiles.push(savedFile);
                } catch (fileError) {
                    console.error(`Error processing file ${file.originalname}:`, fileError);
                }
            }

            // Check if at least one file was successfully processed
            if (savedFiles.length === 0) {
                res.json({status:"failed", message:"No files were successfully processed"});
            }

            // Respond with success and saved files
            res.json({ status: "success", path: savedFiles });

            // Respond with success and file paths
            // res.json({ status: 'success', path: filePaths });
        } catch (e) {
            console.error("Error processing files:", e);

            // Cleanup: Remove files written to disk
            for (const file of uploadedFiles) {
                try {
                    fs.unlinkSync(file); // Delete the file
                } catch (unlinkErr) {
                    console.error("Error deleting file:", unlinkErr);
                }
            }

            res.status(500).json({ status: "failed", message: "File processing failed" });
        }
    });
};





exports.fileLoad = async (req, res)=>{
    try {
        let pageNo = Number(req.query.pageNo) || 1;
        let perPage = Number(req.query.perPage) || 10;
        let skip = (pageNo-1)*perPage;

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
            {
                $facet:{
                    total:[{$count:"total"}],
                    data:[
                        {$match:{categoryId:{$ne:new mongoose.Types.ObjectId("67c93e7bff401abf3898c328")}}},
                        joinWithCategory,
                        unWindCategory,
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

        //res.json({status:"success", file:data});
        res.json({status:"success", total:data[0].total[0].total, load:data[0].data.length, file:data[0].data});
    }catch (e) {
        res.json({status:"failed", message:e});
    }
}



exports.singleFile = async (req, res)=>{
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

        const joinWithUser = {$lookup:{
                from: "profiles",
                localField: "userId",
                foreignField:"userId",
                as: "user"
            }};
        const unWindUser = {$unwind:"$user"};

        const projection = {$project:{
                'filePath':1,
                'categoryId':1,
                'userId':1,
                'category.categoryName':1,
                'user.userName':1,
                'createdAt':1,
                'updatedAt':1,
            }}
        const data = await FileModel.aggregate([
            matchStage,
            joinWithCategory,
            unWindCategory,
            joinWithUser,
            unWindUser,
            projection
        ]);
        return res.json({status:"success", data:data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}



exports.fileDelete = async (req, res)=>{
    try {
        const {id} = req.params;
        const file = await FileModel.findOne({_id:id});

        const [catRef, authRef] = await Promise.all([
            CategoryModel.find({categoryImg:file.filePath}),
            AuthorModel.find({profilePicture:file.filePath}),
        ])
        if(catRef.length > 0 || authRef.length > 0){
            res.json({status:"failed", message:"This file is referenced in another collection and cannot be deleted."});
        }else {
            if(isAdmin(req.headers.token || req.cookies.token)){
                const fileDirectory = path.join(__dirname, '../..', file.filePath);
                if (file) {
                    fs.unlink(fileDirectory, (async (err) => {
                        if (err){
                            res.json({status:"error", message:err});
                        } else {
                            const data =await FileModel.deleteOne({_id: id});
                            res.json({status:"success", data:data});
                        }
                    }));
                }
            }else {
                res.json({status:"failed", message:"You are not authorized to process this operation!"});
            }





        }


    }catch (e) {
        res.json({status:"failed", message:e});
    }
}