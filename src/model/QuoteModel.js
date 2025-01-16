const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    quote: {type: String, required:true, unique:true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'AuthorModel'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel', required: true},
    status: {type: String, enum: ['draft', 'cancel', 'pending', 'published'], default:'pending' },
}, {timestamps:true, versionKey:false});

const QuoteModel = mongoose.model("quotes", databaseSchema);
module.exports = QuoteModel;

