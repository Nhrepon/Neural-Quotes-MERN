const mongoose = require('mongoose');

const databaseSchema = mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true},
    category: {type: String, default: "category"},
    filePath: {type: String, required: true},
},
    {timestamps:true, versionKey:false});

const FileModel = mongoose.model("file", databaseSchema);

module.exports = FileModel;