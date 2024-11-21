const express = require('express');

const router = require('./src/routes/api');
const app = new express();


// Security middleware import
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');


// Security middleware implement
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());



// Allow img from other src
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", "http://localhost:2000", "data:"],
            },
        },
    }),
);





// Req rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 3000 });
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


const path = require("path");
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Api router manage
app.use("/api", router);



app.set("etag", false);




// connect front end
app.use(express.static("client/dist"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});


module.exports = app;