const express = require('express');
const UserController = require("../controller/UserController");
const FileUploadController = require("../controller/FileUploadController");

const router = express.Router();


router.post('/userRegistration', UserController.userRegistration);




router.post('/fileUpload', FileUploadController.fileUpload);



module.exports = router;