const express = require('express');
const UserController = require("../controller/UserController");
const FileUploadController = require("../controller/FileUploadController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();


router.post('/userRegistration', UserController.userRegistration);
router.post('/userLogin', UserController.userLogin);
router.post('/userLogout', UserController.userLogout);

router.get('/userProfileRead', AuthMiddleware, UserController.userProfileRead);
router.put('/userProfileUpdate', AuthMiddleware, UserController.userProfileUpdate);




router.post('/fileUpload', AuthMiddleware, FileUploadController.fileUpload);
router.get('/fileLoad', FileUploadController.fileLoad);
router.get('/singleFile/:id', FileUploadController.singleFile);
router.delete('/fileDelete/:id', AuthMiddleware, FileUploadController.fileDelete);



module.exports = router;