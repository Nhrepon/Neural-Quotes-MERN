const mongoose = require('mongoose');

const databaseSchema = mongoose.Schema({
    email:{type:String, required: true, unique:true},
    password:{type:String},
    role:{type:String, enum: ['admin', 'user'], default:"user"}
},{timestamps:true, versionKey:false});

const UserModel = mongoose.model("users", databaseSchema);
module.exports = UserModel;