const express = require('express');

const userController = require("../controllers/user");
const authmiddleware = require('../middlewares/auth');

const router = express.Router(); 

router.post("/register",userController.userRegistration);
router.post("/login",userController.userLogin);
router.post("/logout",userController.userLogout);
router.post("/add-to-wishlist",authmiddleware(["buyer", "seller", "admin"]),userController.wishlist);
router.get("/getwishlist",authmiddleware(["buyer", "seller", "admin"]),userController.getwishlist);
router.post("/address",authmiddleware(["buyer", "seller", "admin"]),userController.saveaddress); 

module.exports = router;