const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    quote: {type: String, required:true, unique:true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'AuthorModel', required:true, index: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true, index: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel', required: true, index: true},
    status: {type: String, enum: ['draft', 'cancel', 'pending', 'published'], default:'pending', index: true},
}, {timestamps:true, versionKey:false});

databaseSchema.index({updatedAt:-1});
const QuoteModel = mongoose.model("quotes", databaseSchema);
module.exports = QuoteModel;

