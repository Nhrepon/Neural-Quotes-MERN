const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    quoteId:{type: mongoose.Schema.Types.ObjectId, ref: 'QuoteModel'},
    likes: {type: Number, default: 0},
    views: {type: Number, default: 0},
    sharedCount: {type: Number, default: 0},
}, {timestamps: true, versionKey: false});
const QuoteMeta = mongoose.model('QuoteMetas', databaseSchema);
module.exports = QuoteMeta;