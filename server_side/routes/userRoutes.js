const express = require('express');
const router = express.Router();
const {authenticateToken: userAuth} = require('../utils/userAuth')
const userController = require('../controllers/userController');

//  USER LOGIN
router.post('/login', userController.userLogin);        

//  USER REGISTER
router.post('/register', userController.userRegister);

//  Get Banners
router.get('/banners', userAuth, userController.getBanners);

//  Get Videos
router.get('/videos', userAuth, userController.getVideos);

//  Get Audios
router.get('/audios', userAuth, userController.getAudios);

module.exports = router;
