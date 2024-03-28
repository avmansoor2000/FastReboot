// const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
// const User = reauire('')
const Banner = require('../models/Banners')
const Video = require('../models/Videos')
const Audio = require('../models/Audio')
const User = require('../models/User')
const Mentor = require('../models/Mentor')
const moment = require('moment-timezone');
const {generateToken,invalidateToken} = require('../utils/adminAuth');

//           USER LOGIN

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(401).json({success:false, message: 'Invalid email or password' });
        }

        

        // Check if the password is correct
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await password == user.password

        if (!isPasswordValid) {
            return res.status(401).json({success:true, message: 'Invalid name or password' });
        }

        // Generate and send JWT token
        const token = generateToken(user._id);
        return res.status(200).json({success:true, message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message: 'Server Error' });
    }
};


//      ADMIN LOGOUT

const adminLogout = (req,res) => {
    try{

        invalidateToken(req,res);
        
        return res.status(200).json({success:true, message: 'Logout successful' });

    }catch(error){
        console.error('Error during logout:', error);
        return res.status(500).json({success:false, message: 'Internal Server Error' });

    }
};
        

//      Dashboard

const getDashboard = async(req,res)=> {
   
    try{
        const activeUsers = (await User.find({status:'progressing'})) ?. length ;
        const completedUsers = (await User.find({ status: 'completed' })) ?. length;
        const mentors = (await Mentor.find({})) ?. length;

        return res.status(200).json({
            success: true,
            activeUsers: activeUsers || 0,
            completedUsers: completedUsers || 0,
            // totalUsers: totalUsers || 0,
            mentors: mentors || 0
        })

    }catch(error){

        console.error('Error while fetching dashboard statistics:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch dashboard statistics. Please try again later.' });

    }
};

//      ADD BANNER

const addBanner = async(req,res) => {
    const {heading,description} = req.body

    if( !heading || !description){
        return res.status(400).json({success: false,message: 'Fill all the fields.'})
    }
    try{

        const bannerDocument = new Banner ({
            heading,
            description
        })
        await bannerDocument.save()
        
        return res.status(200).json({success: true, message: 'Banner added successfully'})


}catch(error){
   console.error("Error while adding banner:", error);
    return res.status(500).json({ error: "Error while adding banner" });
}
};


//      EDIT BANNER

const editBanner = async (req, res) => {
    
    const bannerId = req.query._id
    console.log(bannerId);
    const {heading, description } = req.body;

    if ( !heading || !description) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
    }

    try {

        const banner = await Banner.findById(bannerId);

        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found.' });
        }

        // Update the banner details
        banner.heading = heading;
        banner.description = description;

        // Save the updated banner to the database
        await banner.save();

        return res.status(200).json({ success: true, message: 'Banner updated successfully.' });
    } catch (error) {
        console.error("Error while editing banner:", error);
        return res.status(500).json({ success: false, error: "Error while editing banner." });
    }
};


//      DELETE BANNER

const deleteBanner = async (req, res) => {
    // console.log('Deleting banner...');
    const bannerId = req.query._id;
    try {

        // Check if banner exists
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found.' });
        }

        // Delete banner
        await Banner.findByIdAndDelete(bannerId);

        // console.log('Banner deleted:', bannerId);
        return res.status(200).json({ success: true, message: 'Banner deleted successfully.' });

    } catch (error) {
        console.error("Error while deleting banner:", error);
        res.status(500).json({ success: false, error: "Error while deleting banner" });
    }
};


//      GET ALL BANNERS

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find(); 

           if (banners.length === 0) {
            return res.status(404).json({ message: 'No banners found' });
        }

        return res.status(200).json({success:false,message: 'Banners fetched successfully', data:banners});
    } catch (error) {
        console.error('Error while fetching banners:', error);
        return res.status(500).json('Error while fetching banners');
    }
};


//      ADD VIDEO

const addVideo = async(req,res) => {
    const {video_path,heading,description} = req.body

    if(!video_path || !heading || !description){
        return res.status(400).json({success: false,message: 'Fill all the fields.'})
    }
    try{

        const videoDocument = new Video ({
            video_path,
            heading,
            description
        })
        await videoDocument.save()
        
        return res.status(200).json({success: true, message: 'Video added successfully'})


}catch(error){
   console.error("Error while adding video:", error);
    return res.status(500).json({success: false, error: "Error while adding video" });
}
};


//      EDIT VIDEO

const editVideo = async (req, res) => {
    
    const videoId = req.query._id
    console.log(videoId);
    const { video_path, heading, description } = req.body;

    if (!video_path || !heading || !description) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
    }

    try {

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found.' });
        }

        // Update the Video details
        video.video_path = video_path;
        video.heading = heading;
        video.description = description;

        // Save the updated Video to the database
        await video.save();

        return res.status(200).json({ success: true, message: 'Video updated successfully.' });
    } catch (error) {
        console.error("Error while editing video:", error);
        return res.status(500).json({ success: false, error: "Error while editing video." });
    }
};


//      DELETE VIDEO

const deleteVideo = async (req, res) => {
    // console.log('Deleting video...');
    const videoId = req.query._id;
    try {

        // Check if video exists
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ success: false, message: 'video not found' });
        }

        // Delete video
        await Video.findByIdAndDelete(videoId);

        // console.log('video deleted:', videoId);
        return res.status(200).json({ success: true, message: 'video deleted successfully' });

    } catch (error) {
        console.error("Error while deleting video:", error);
        res.status(500).json({ success: false, error: "Error while deleting video" });
    }
};


//      GET ALL Videos

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find(); 

           if (videos.length === 0) {
            return res.status(404).json({success:false, message: 'No videos found' });
        }

        return res.status(200).json({success:true,message: 'Videos fetched successfully',data:videos});
    } catch (error) {
        console.error('Error while fetching videos:', error);
        return res.status(500).json({success:false, error:'Error while fetching videos'});
    }
};



//      ADD AUDIO

const addAudio = async(req,res) => {
    console.log(req.body);
    const {audio_path,heading,description} = req.body

    if(!audio_path || !heading || !description){
        return res.status(400).json({success: false,message: 'Fill all the fields.'})
    }
    try{

        const audioDocument = new Audio ({
            audio_path,
            heading,
            description
        })
        await audioDocument.save()
        
        return res.status(200).json({success: true, message: 'Audio added successfully'})


}catch(error){
   console.error("Error while adding audio:", error);
    return res.status(500).json({success:false, error: "Failed to add audio. Please try again later." });
}
};


//      EDIT AUDIO

const editAudio = async (req, res) => {
    
    const audioId = req.query._id
    console.log(audioId);
    const { audio_path, heading, description } = req.body;

    if (!audio_path || !heading || !description) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
    }

    try {

        const audio = await Audio.findById(audioId);

        if (!audio) {
            return res.status(404).json({ success: false, message: 'audio not found.' });
        }

        // Update the audio details
        audio.audio_path = audio_path;
        audio.heading = heading;
        audio.description = description;

        // Save the updated audio to the database
        await audio.save();

        return res.status(200).json({ success: true, message: 'audio updated successfully.' });
    } catch (error) {
        console.error("Error while editing audio:", error);
        return res.status(500).json({ success: false, error: "Failed to edit audio. Please try again later." });
    }
};


//      DELETE AUDIO

const deleteAudio = async (req, res) => {
    // console.log('Deleting audio...');
    const audioId = req.query._id;
    try {

        // Check if audio exists
        const audio = await Audio.findById(audioId);
        if (!audio) {
            return res.status(404).json({ success: false, message: 'audio not found.' });
        }

        // Delete audio
        await Audio.findByIdAndDelete(audioId);

        console.log('audio deleted:', audioId);
        return res.status(200).json({ success: true, message: 'audio deleted successfully.' });

    } catch (error) {
        console.error("Error while deleting audio:", error);
        res.status(500).json({ success: false, error: "Error while deleting audio" });
    }
};


//      GET ALL Audios

const getAllAudios = async (req, res) => {
    try {
        const audios = await Audio.find(); 

           if (audios.length === 0) {
            return res.status(404).json({success:false, message: 'No audios found' });
        }

        return res.status(200).json({success:true,message: 'Audios fetched successfully', data: audios});
    } catch (error) {
        console.error('Error while fetching audios:', error);
        return res.status(500).json({success:false, error: 'Failed to fetch audios. Please try again later.'});
    }
};


//      ADD USER

const addUser = async(req,res) =>{
    const {name,number,email,password,duration,payment,mentor} = req.body
    // console.log(req.body);
    try{

        if(!name || !number || !email || !password || !payment || !duration){
            return res.status(404).json({success:false, message:'Fill all the fields'})
        }

        const user = await User.findOne({email});
        // console.log(user,'ddddddddddddddddddd');

        if(!user){

            const currentDateIST = moment().tz('Asia/Kolkata').startOf('day');
            const expirationDateIST = currentDateIST.clone().add(duration, 'days').startOf('day'); 
            const newUser = new User({
                name,
                number,
                email,
                password,
                payment,
                duration,
                mentor,
                daysRemaining : duration,
                accessExpiresAt: expirationDateIST,
            })
            // console.log(newUser,'ffffffffffffff');
            await newUser.save();

            return res.status(200).json({success:true, message: 'successfuly registred'})

        }else{
            user.daysRemaining += duration
            await user.save();

            return res.status(200).json({success: true, message:'User already exists, days remaining updated'});
        }

    }catch(error){

        console.error('Error while adding user:', error);
        return res.status(500).json({ success: false, message: 'Failed to add user. Please try again later.' });

    }
};


//      EDIT USER
const editUser = async (req, res) => {
    try {
        
        const { userId } = req.query; // Assuming userId is passed as a parameter
        // console.log('hhhhhhhhhhhh',userId);
        const { name, number, email, password, duration } = req.body;

        if (!name && !number && !email && !password && !duration) {
            return res.status(400).json({success:false, message:'No fields to update'});
        }

        const user = await User.findById(userId); // Assuming you have a User model and you're using Mongoose

        if (!user) {
            return res.status(404).json({success:false, message:'User not found'});
        }

        if (name) {
            user.name = name;
        }

        if (number) {
            user.number = number;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = password;
        }

        if (duration) {
    
            user.daysRemaining += duration;
            user.duration += duration

            // Update access expiration date based on new duration
            const currentDateIST = moment().tz('Asia/Kolkata').startOf('day');
            const expirationDateIST = currentDateIST.clone().add(user.daysRemaining, 'days').startOf('day');
            user.accessExpiresAt = expirationDateIST;
        }

        await user.save();

        return res.status(200).json({success:false, message:'User updated successfully'});

    } catch (error) {
        console.error('Error while adding user:', error);
        return res.status(500).json({ success: false, message: 'Failed to edit user details. Please try again later.' });
    }
};


//       DELETE USER

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.query; 

        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({success:false, message:'User not found'});
        }

        // Perform deletion of the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({success:true, message:'User deleted successfully'});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'Error while deleting user'});
    }
};


//      GET ALL USERS

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 

           if (users.length === 0) {
            return res.status(404).json({success:false, message: 'No users found' });
        }

        return res.status(200).json({success:true, message: 'Users fetched successfully',data:users});
    } catch (error) {
        console.error('Error while fetching users:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch users. Please try again later.' });
    }
};


//      Filter Users using Status

const filterUsers = async (req, res) => {
    try {
        const { status } = req.query;
        // console.log(status);
        const filteredUsers = await User.find({ status });
        
        if (filteredUsers.length === 0) {
            return res.status(404).json({success:false, message: 'No users found with the provided status' });
        }

        return res.status(200).json({ success: true, message: 'Users filtered successfully', data: filteredUsers });
    } catch (error) {

        console.error('Error while filtering users:', error);
        return res.status(500).json({ success: false, message: 'Failed to filter users. Please try again later.' });
    }
};


//      Search Users using name

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const searchResults = await User.find({ name: { $regex: new RegExp(query, "i") } });

        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'No users found matching the search query' });
        }

        return res.status(200).json({success:true,message:'Users found matching the search query', data:searchResults});
    } catch (error) {
        console.error('Error while searching users:', error);
        return res.status(500).json({ success: false, message: 'Failed to search users. Please try again later.' });
    }
};


//      Add Mentor

const addMentor = async(req,res) => {
    const {name,specialization,phone_no,email} = req.body
    try{

    const newMentor = new Mentor({
        name,
        specialization,
        phone_no,
        email
    })

    await newMentor.save()

    return res.status(200).json({ success: true, message: 'Mentor added successfully' })
}catch(error){
    console.error('Error while adding mentor:', error);
        return res.status(500).json({ success: false, message: 'Error while adding mentor. Please try again later.' });
}

};


//      EDIT MENTOR

const editMentor = async(req,res) => {
    const {mentorId} = req.query
    const {name,specialization,phone_no,email} = req.body

    if (!name || !specialization || !phone_no || !email) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
    }

    try {

        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({ success: false, message: 'Mentor not found.' });
        }

        // Update the mentor details
        mentor.name = name;
        mentor.specialization = specialization;
        mentor.phone_no = phone_no;
        mentor.email = email;

        // Save the updated mentor to the database
        await mentor.save();

        return res.status(200).json({ success: true, message: 'Mentor details updated successfully.' });
    } catch (error) {
        console.error("Error while editing mentor:", error);
        return res.status(500).json({ success: false, error: "Error while editing mentor." });
    }
};


//      DELETE MENTOR

const deleteMentor = async (req, res) => {
    console.log('Deleting mentor...');
    const {mentorId} = req.query;
    console.log(mentorId);
    try {

        // Check if mentor exists
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ success: false, message: 'Mentor not found.' });
        }

        // Delete mentor
        await Mentor.findByIdAndDelete(mentorId);

        // console.log('mentor deleted:', mentorId);
        return res.status(200).json({ success: true, message: 'Mentor deleted successfully.' });

    } catch (error) {
        console.error("Error while deleting mentor:", error);
        res.status(500).json({ success: false, error: "Error while deleting mentor" });
    }
};


//      GET ALL Mentors

const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find(); 

           if (mentors.length === 0) {
            return res.status(404).json({ success: false, message: 'No mentors found' });
        }
        // console.log(mentors,'ddddddddddddddddd');

        return res.status(200).json({success:true, message:'Mentors fetched successfully',data:mentors});
    } catch (error) {
        console.error('Error while fetching mentors:', error);
        return res.status(500).json({success:false, error:'Error while fetching mentors'});
    }
};


//       Get SalesReport

const getSalesReport = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Assuming User model has a 'createdAt' field for sorting
        const salesReports = await User.find()
            .skip(skip)
            .limit(limit)
            .sort('-createdAt');

        return res.status(200).json({success:true, data:salesReports });
    } catch (error) {
        console.error("Error fetching sales reports:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    adminLogin,adminLogout,getDashboard,
    addBanner,editBanner,deleteBanner,getAllBanners,
    addVideo,editVideo,deleteVideo,getAllVideos,
    addAudio,editAudio,deleteAudio,getAllAudios,
    addUser,editUser,deleteUser,getAllUsers,filterUsers,searchUsers,
    addMentor,editMentor,deleteMentor,getAllMentors,
    getSalesReport
  };