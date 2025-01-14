const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    name:{type:String, required: true, unique:true},
    bio: { type: String },
    profilePicture: { type: String },
    nationality: { type: String },
    socialLinks: [{ type: String }],

}, {timestamps: true, versionKey: false});

databaseSchema.index({name:1});

const AuthorModel = mongoose.model('authors',databaseSchema);
module.exports = AuthorModel;