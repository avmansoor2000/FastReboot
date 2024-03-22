const express = require('express');
const router = express.Router();
const {authenticateToken: userAuth} = require('../utils/userAuth')
const userController = require('../controllers/userController');

//  User Auth
router.post('/user_auth',userAuth)

//  USER LOGIN
router.post('/login', userController.userLogin);  

//  User Logout
router.post('/logout',userController.userLogout)

//  USER REGISTER
router.post('/register', userController.userRegister);

//  Get Banners
router.get('/banners', userController.getBanners);

//  Get Videos
router.get('/videos', userController.getVideos);

//  Get Audios
router.get('/audios', userController.getAudios);

//  Get Profile Details
router.get('/profile_details',userController.profileDetails)

module.exports = router;
