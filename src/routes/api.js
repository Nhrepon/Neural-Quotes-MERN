const express = require('express');
const UserController = require("../controller/UserController");

const router = express.Router();


router.post('/userRegistration', UserController.userRegistration);



module.exports = router;