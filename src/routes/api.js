const express = require('express');
const UserController = require("../controller/UserController");
const FileUploadController = require("../controller/FileUploadController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const CategoryController = require("../controller/CategoryController");
const QuoteController = require("../controller/QuoteController");
const AuthorController = require("../controller/AuthorController");

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



// Category route
router.post('/createCategory', AuthMiddleware, CategoryController.createCategory);
router.get('/categoryList', CategoryController.categoryList);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.delete('/deleteCategory/:id',AuthMiddleware, CategoryController.deleteCategory);


// Author route
router.post('/createAuthor', AuthMiddleware, AuthorController.createAuthor);
router.get('/authorList', AuthMiddleware, AuthorController.authorList);
router.put('/updateAuthor/:id', AuthMiddleware, AuthorController.updateAuthor);
router.delete('/deleteAuthor/:id', AuthMiddleware, AuthorController.deleteAuthor);


// Quotes route
router.post('/createQuote', AuthMiddleware, QuoteController.createQuote);

module.exports = router;