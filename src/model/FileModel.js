const mongoose = require('mongoose');

const databaseSchema = mongoose.Schema({
    name: {type: String, default: "Neural quotes"},
    category: {type: String, default: "category"},
    filePath: {type: String, required: true},
},
    {timestamps:true, versionKey:false});

const FileModel = mongoose.model("file", databaseSchema);

module.exports = FileModel;