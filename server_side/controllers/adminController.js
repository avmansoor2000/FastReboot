// const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
// const User = reauire('')
const Banner = require('../models/Banners')
const Video = require('../models/Videos')
const Audio = require('../models/Audio')
const User = require('../models/User')
const moment = require('moment-timezone');
const bcrypt = require('bcrypt')
const {generateToken,invalidateToken} = require('../utils/adminAuth');
const Mentor = require('../models/Mentor');

//           USER LOGIN

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        

        // Check if the password is correct
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await password == user.password

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid name or password' });
        }

        // Generate and send JWT token
        const token = generateToken(user._id);
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


//      ADMIN LOGOUT

const adminLogout = (req,res) => {
    try{

        invalidateToken(req,res);
        
        return res.status(200).json({ message: 'Logout successful' });

    }catch(error){
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal Server Error' });

    }
}
        

//      Dashboard

const getDashboard = async(req,res)=> {
    try{
        const activeUsers = User.findMany({status: "progressing"})
        const completedUsers = User.findMany({status: "completed"})
        const totalUsers = activeUsers + completedUsers
        const Mentors = Mentors

        return res.status(200).json('success')

    }catch(error){

        return res.status(500).json({message: "error"})

    }
}


//      ADD BANNER

const addBanner = async(req,res) => {
    const {img_path,heading,description} = req.body

    if(!img_path || !heading || !description){
        return res.status(400).json({succes: false,message: 'Fill all the fields.'})
    }
    try{

        const newBanner = new Banner ({
            img_path,
            heading,
            description
        })
        await newBanner.save()
        
        return res.status(200).json({succes: true, message: 'success'})


}catch(error){
   console.error("Error while adding banner:", error);
    res.status(500).json({ error: "Error while adding banner" });
}
}


//      EDIT BANNER

const editBanner = async (req, res) => {
    
    const bannerId = req.query._id
    console.log(bannerId);
    const { img_path, heading, description } = req.body;

    if (!img_path || !heading || !description) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
    }

    try {

        const banner = await Banner.findById(bannerId);

        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found.' });
        }

        // Update the banner details
        banner.img_path = img_path;
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
    console.log('Deleting banner...');
    const bannerId = req.query._id;
    try {

        // Check if banner exists
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found.' });
        }

        // Delete banner
        await Banner.findByIdAndDelete(bannerId);

        console.log('Banner deleted:', bannerId);
        return res.status(200).json({ success: true, message: 'Banner deleted successfully.' });

    } catch (error) {
        console.error("Error while deleting banner:", error);
        res.status(500).json({ success: false, error: "Error while deleting banner" });
    }
}


//      GET ALL BANNERS

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find(); 

           if (banners.length === 0) {
            return res.status(404).json({ message: 'No banners found' });
        }

        return res.status(200).json(banners);
    } catch (error) {
        console.error('Error while fetching banners:', error);
        return res.status(500).json('Error while fetching banners');
    }
};


//      ADD VIDEO

const addVideo = async(req,res) => {
    const {video_path,heading,description} = req.body

    if(!video_path || !heading || !description){
        return res.status(400).json({succes: false,message: 'Fill all the fields.'})
    }
    try{

        const newVideo = new Video ({
            video_path,
            heading,
            description
        })
        await newVideo.save()
        
        return res.status(200).json({succes: true, message: 'success'})


}catch(error){
   console.error("Error while adding video:", error);
    res.status(500).json({ error: "Error while adding video" });
}
}


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
    console.log('Deleting video...');
    const videoId = req.query._id;
    try {

        // Check if video exists
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ success: false, message: 'video not found.' });
        }

        // Delete video
        await Video.findByIdAndDelete(videoId);

        console.log('video deleted:', videoId);
        return res.status(200).json({ success: true, message: 'video deleted successfully.' });

    } catch (error) {
        console.error("Error while deleting video:", error);
        res.status(500).json({ success: false, error: "Error while deleting video" });
    }
}


//      GET ALL Videos

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find(); 

           if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found' });
        }

        return res.status(200).json(videos);
    } catch (error) {
        console.error('Error while fetching videos:', error);
        return res.status(500).json('Error while fetching videos');
    }
};



//      ADD AUDIO

const addAudio = async(req,res) => {
    console.log(req.body);
    const {audio_path,heading,description} = req.body

    if(!audio_path || !heading || !description){
        return res.status(400).json({succes: false,message: 'Fill all the fields.'})
    }
    try{

        const newAudio = new Audio ({
            audio_path,
            heading,
            description
        })
        await newAudio.save()
        
        return res.status(200).json({succes: true, message: 'success'})


}catch(error){
   console.error("Error while adding audio:", error);
    res.status(500).json({ error: "Error while adding audio" });
}
}


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
        return res.status(500).json({ success: false, error: "Error while editing audio." });
    }
};


//      DELETE AUDIO

const deleteAudio = async (req, res) => {
    console.log('Deleting audio...');
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
}


//      GET ALL Audios

const getAllAudios = async (req, res) => {
    try {
        const audios = await Audio.find(); 

           if (audios.length === 0) {
            return res.status(404).json({ message: 'No audios found' });
        }

        return res.status(200).json(audios);
    } catch (error) {
        console.error('Error while fetching audios:', error);
        return res.status(500).json('Error while fetching audios');
    }
};


//      ADD USER

const addUser = async(req,res) =>{
    const {name,number,email,password,duration} = req.body
    console.log(req.body);
    try{
        if(!name || !number || !email || !password || !duration){
            return res.status(404).json('Fill all the fields')
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhh');

        const user = await User.findOne({email});
        console.log(user,'ddddddddddddddddddd');

        if(!user){
            // const currentDateIST = moment().tz('Asia/Kolkata');
            // const expirationDateIST = currentDateIST.clone().add(duration, 'days');
            const currentDateIST = moment().tz('Asia/Kolkata').startOf('day'); // Set time to 00:00:00
            const expirationDateIST = currentDateIST.clone().add(duration, 'days').startOf('day'); // Set time to 00:00:00
            const newUser = new User({
                name,
                number,
                email,
                password,
                daysRemaining : duration,
                accessExpiresAt: expirationDateIST
            })
            console.log(newUser,'ffffffffffffff');
            await newUser.save();

            return res.status(200).json('successfuly registred')

        }else{
            user.daysRemaining += duration
            await user.save();

            return res.status(200).json('User already exists, days remaining updated');
        }

    }catch(error){

        return res.status(500).json('Error while adding user')

    }
}


//      EDIT USER
const editUser = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a parameter
        const { name, number, email, password, duration } = req.body;

        if (!name && !number && !email && !password && !duration) {
            return res.status(400).json('No fields to update');
        }

        const user = await User.findById(userId); // Assuming you have a User model and you're using Mongoose

        if (!user) {
            return res.status(404).json('User not found');
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
            // Assuming daysRemaining represents the remaining duration of access
            user.daysRemaining += duration;
            // Update access expiration date based on new duration
            const currentDateIST = moment().tz('Asia/Kolkata').startOf('day');
            const expirationDateIST = currentDateIST.clone().add(user.daysRemaining, 'days').startOf('day');
            user.accessExpiresAt = expirationDateIST;
        }

        await user.save();

        return res.status(200).json('User updated successfully');

    } catch (error) {
        console.error(error);
        return res.status(500).json('Error while updating user');
    }
};


//       DELETE USER

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a parameter

        const user = await User.findById(userId); // Assuming you have a User model and you're using Mongoose

        if (!user) {
            return res.status(404).json('User not found');
        }

        // Perform deletion of the user
        await user.remove();

        return res.status(200).json('User deleted successfully');

    } catch (error) {
        console.error(error);
        return res.status(500).json('Error while deleting user');
    }
};


//      GET ALL USERS

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 

           if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error while fetching users:', error);
        return res.status(500).json('Error while fetching users');
    }
};


//      Add Mentor

const addMentor = async(req,res) => {
    const {name,specification,phone_no} = req.body
    try{

    const newMentor = new Mentor({
        name,
        specification,
        phone_no
    })

    await newMentor.save()

    return res.status(200).json('success')
}catch(error){
    return res.status(500).json('Error while Adding Mentor')
}

}


//      EDIT MENTOR

const editMentor = async(req,res) => {
    const MentorID = req.params
    const {name,specialization,phone_no} = req.body

    if (!name || !specialization || !phone_no) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
    }

    try {

        const mentor = await Mentor.findById(MentorID);

        if (!mentor) {
            return res.status(404).json({ success: false, message: 'mentor not found.' });
        }

        // Update the mentor details
        mentor.name = name;
        mentor.specialization = specialization;
        mentor.phone_no = phone_no;

        // Save the updated mentor to the database
        await mentor.save();

        return res.status(200).json({ success: true, message: 'mentor details updated successfully.' });
    } catch (error) {
        console.error("Error while editing mentor:", error);
        return res.status(500).json({ success: false, error: "Error while editing mentor." });
    }
}


//      DELETE MENTOR

const deleteMentor = async (req, res) => {
    console.log('Deleting mentor...');
    const mentorId = req.query._id;
    try {

        // Check if mentor exists
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ success: false, message: 'mentor not found.' });
        }

        // Delete mentor
        await Mentor.findByIdAndDelete(mentorId);

        console.log('mentor deleted:', mentorId);
        return res.status(200).json({ success: true, message: 'mentor deleted successfully.' });

    } catch (error) {
        console.error("Error while deleting mentor:", error);
        res.status(500).json({ success: false, error: "Error while deleting mentor" });
    }
}


//      GET ALL Audios

const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find(); 

           if (mentors.length === 0) {
            return res.status(404).json({ message: 'No mentors found' });
        }

        return res.status(200).json(mentors);
    } catch (error) {
        console.error('Error while fetching mentors:', error);
        return res.status(500).json('Error while fetching mentors');
    }
};



module.exports = {
    adminLogin,adminLogout,getDashboard,
    addBanner,editBanner,deleteBanner,getAllBanners,
    addVideo,editVideo,deleteVideo,getAllVideos,
    addAudio,editAudio,deleteAudio,getAllAudios,
    addUser,editUser,deleteUser,getAllUsers,
    addMentor,editMentor,deleteMentor,getAllMentors
  };