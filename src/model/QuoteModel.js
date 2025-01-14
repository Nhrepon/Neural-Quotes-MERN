const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    quote: {type: String, required:true, unique:true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    status: {type: String, enum: ['draft', 'cancel', 'pending', 'published'], default:'draft' },
}, {timestamps:true, versionKey:false});

const QuoteModel = mongoose.model("quotes", databaseSchema);
module.exports = QuoteModel;

