const mongoose = require('mongoose');

const databaseSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    mobile:{type: String},
    subject:{type: String, required: true},
    message:{type: String,},
    isRead:{type: Boolean, default: false},
    isDeleted:{type: Boolean, default: false},
}, {timestamps: true, versionKey: false});
databaseSchema.index({updatedAt:1});
const InboxModel = mongoose.model("inbox", databaseSchema);
module.exports = InboxModel;