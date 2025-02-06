const express = require('express');
const UserController = require("../controller/UserController");
const FileUploadController = require("../controller/FileUploadController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const CategoryController = require("../controller/CategoryController");
const QuoteController = require("../controller/QuoteController");
const AuthorController = require("../controller/AuthorController");
const AdminMiddleware = require("../middleware/AdminMiddleware");


const router = express.Router();


router.post('/userRegistration', UserController.userRegistration);
router.post('/userLogin', UserController.userLogin);
router.post('/userLogout', UserController.userLogout);

router.get('/userProfileRead', AuthMiddleware, UserController.userProfileRead);
router.put('/userProfileUpdate', AuthMiddleware, UserController.userProfileUpdate);




router.post('/fileUpload', AdminMiddleware, FileUploadController.fileUpload);
router.get('/fileLoad', FileUploadController.fileLoad);
router.get('/singleFile/:id', FileUploadController.singleFile);
router.delete('/fileDelete/:id', AuthMiddleware, FileUploadController.fileDelete);



// Category route
router.post('/createCategory', AuthMiddleware, CategoryController.createCategory);
router.get('/categoryList', CategoryController.categoryList);
router.get('/categoryList/:pageNo/:perPage/:keyword', CategoryController.categoryList);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.delete('/deleteCategory/:id',AuthMiddleware, CategoryController.deleteCategory);


// Author route
router.post('/createAuthor', AuthMiddleware, AuthorController.createAuthor);
router.get('/authorList', AuthMiddleware, AuthorController.authorList);
router.put('/updateAuthor/:id', AuthMiddleware, AuthorController.updateAuthor);
router.delete('/deleteAuthor/:id', AuthMiddleware, AuthorController.deleteAuthor);


// Quotes route
router.post('/createQuote', AuthMiddleware, QuoteController.createQuote);
router.get('/quoteList', QuoteController.quoteList);
router.get('/singleQuote/:id', QuoteController.singleQuote);
router.put('/updateQuote/:id',AuthMiddleware, QuoteController.updateQuote);
router.delete('/deleteQuote/:id',AuthMiddleware, QuoteController.deleteQuote);

module.exports = router;