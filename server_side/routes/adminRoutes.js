const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminController')
const {authenticateToken : adminAuth} = require('../utils/adminAuth')


//  Admin Auth
router.post('/admin_auth',adminAuth)

//   Admin Login
router.post('/',adminController.adminLogin);

//   Admin Logout
router.post('/logout',adminController.adminLogout)

//   Dashboard
router.get('/dashboard',adminController.getDashboard);

//   Post Banner
router.post('/add_banner',adminAuth,adminController.addBanner);

//   Edit Banner
router.put('/edit_banner',adminAuth,adminController.editBanner);

//   Delete Banner
router.delete('/delete_banner',adminAuth,adminController.deleteBanner);

//  Get Banners
router.get('/get_banners',adminController.getAllBanners)

//   Add Video
router.post('/add_video',adminController.addVideo);

//   Edit Video
router.put('/edit_video',adminController.editVideo);

//   Delete Video
router.delete('/delete_video',adminController.deleteVideo);

//  Get Videos
router.get('/get_videos',adminController.getAllVideos)

//   Add Audio
router.post('/add_audio',adminController.addAudio);

//   Edit Audio
router.put('/edit_audio',adminController.editAudio);

//   Delete Audio
router.delete('/delete_audio',adminController.deleteAudio);

//  Get Videos
router.get('/get_audios',adminController.getAllAudios)

//   Add User
router.post('/add_user',adminController.addUser);

//   Edit User
router.put('/edit_user',adminController.editUser);

//   Delete User
router.delete('/delete_user',adminController.deleteUser);

//   Get Users
router.get('/get_users', adminController.getAllUsers);

//   Filter Users
router.get('/get_user/filter',adminController.filterUsers)

//   Search Users
router.get('/get_user/search',adminController.searchUsers)

//  Add Mentor
router.post('/add_mentor', adminController.addMentor)

//  Edit Mentor
router.put('/edit_mentor',adminController.editMentor)

//  Delete Mentor
router.delete('/delete_mentor',adminController.deleteMentor)

//   Get Users
router.get('/get_mentors', adminController.getAllMentors);

//   Get Sales Report
router.get('/get_sales_report',adminController.getSalesReport);



module.exports = router;