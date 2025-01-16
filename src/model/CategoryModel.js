const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    categoryName:{type:String,required: true, unique:true},
    categoryDesc:{type:String},
    categoryImg:{type:String},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'UserModel'},
}, { timestamps: true , versionKey: false });
const CategoryModel = mongoose.model("categories", databaseSchema);
module.exports = CategoryModel;