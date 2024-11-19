const express = require('express');

const router = require('./src/routes/api');
const app = new express();


// Security middleware import
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');



// Security middleware implement
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());




// Req rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30000 });
app.use(limiter);

// json body parse
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));




// Database connection
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/PinterestClone";
const option = { user: "", pass: "", autoIndex: true };

//const url="mongodb+srv://Repon:<password>@cluster0.nhslprh.mongodb.net/PinterestClone";
//const option={user:"Repon", pass:"Repon7248", autoIndex:true};

mongoose.connect(url, option).then((res) => {
    console.log("Database connected successful ... ");
}).catch((error) => {
    console.log(error);
});





const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 10000) +'-'+ file.originalname)
    }
})
const upload = multer({ storage: storage });

app.post('/media-upload', upload.array('photos'), function (req, res) {
    if (req.files) {
        res.json({message: "file uploaded successfully!"})
    } else {
        res.json({ message: "File upload failed!"})
    }
});







// Api router manage
app.use("/api", router);


app.set("etag", false);




// connect front end
app.use(express.static("client/dist"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});


module.exports = app;