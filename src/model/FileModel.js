const mongoose = require('mongoose');

const databaseSchema = mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"UserModel", index: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref:"CategoryModel", index: true, required: true},
    filePath: {type: String, required: true, unique: true, index: true},
},{timestamps:true, versionKey:false});
databaseSchema.index({updatedAt:1});
const FileModel = mongoose.model("file", databaseSchema);

module.exports = FileModel;