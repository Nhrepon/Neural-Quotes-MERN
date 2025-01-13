const mongoose = require('mongoose');
const databaseSchema = mongoose.Schema({
    "quote": {type: String},               // The main quote text
    "author": {type: String},              // The name of the author
    "category": {type: String},            // The category (e.g., inspiration, life)     // Tags for filtering and categorization
    "likes": {type: String},               // Number of likes for the quote
    "views": {type: String},               // Number of views for the quote     // Reference to the user who created the quote
    status: {type: String}
});

