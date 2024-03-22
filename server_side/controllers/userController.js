// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// require('dotenv').config();
const User = require('../models/User');
const Banner = require('../models/Banners')
const Video = require('../models/Videos')
const Audio = require('../models/Audio')
const { generateToken,invalidateToken} = require('../utils/userAuth');


//          Post Register

const userRegister = async(req,res)=>{
    const {name,email,phone_no} = req.body

    try{
                                                                             
      if (!name || !email || !phone_no) {
        return res.status(400).json({ success: false, message: 'Fill all the fields.' });
      }else{
        
    const newUser = new User ({
        name,
        email,
        phone_no
    })
    await newUser.save()
    console.log("success");


    return res.status(200).json({success: true, message: 'success'})
}
}catch (error){
    console.error("Error :", error);
    res.status(500).json({ error: "Error" });

}
}

//           USER LOGIN

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await password == user.password;

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid name or password' });
        }

        // Generate and send JWT token
        const token = generateToken(user._id);
        console.log(token);
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Authentication failed. Please try again later.' });
    }
};



//      USER LOGOUT

const userLogout = (req,res) => {
    try{

        invalidateToken(req,res);
        
        return res.status(200).json({ message: 'Logout successful' });

    }catch(error){
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal Server Error' });

    }
}


//   GET BANNER

const getBanners = async (req, res) => {
    try {
        // banners in the database
        const banners = await Banner.find({});

        console.log(banners);
        
        if (banners.length > 0) {
            return res.status(200).json({ success: true, banners: banners });
        } else {
            return res.status(404).json({ success: false, message: 'No banners found' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


//      GET VIDEOS

const getVideos = async(req,res) => {
    try{
        const videos = await Video.find({})
        console.log(videos);
        if(videos.length > 0){
            return res.status(200).json({success: true, videos: videos});
        }else{
            return res.status(404).json({success: false, message: 'No videos found'})
        }


    }catch(error){
        return res.status(500).json({success: false, error: error.message})

    }
};


//      GET AUDIOS

const getAudios = async(req,res) => {
    try{
        const audios = await Audio.find({})

        if(audios.length > 0){
            return res.status(200).json({success: true, audios: audios});
        }else{
            return res.status(404).json({success: false, message: 'No audios found'})
        }

    }catch(error){

        return res.status(500).json({success: false, error: error.message})

    }
}


const profileDetails = async (req, res) => {
    try {
      const {userId} = req.query;
  
      const user = await User.findById(userId);
  
      if (user) {
        const { name, daysRemaining } = user; 
        
        return res.status(200).json({ name, daysRemaining });
      } else {
    
        return res.status(404).json({ error: "User not found" });
      }

    } catch (error) {
      
      return res.status(500).json({ error: error.message });
    }
  };


module.exports = {
    userLogin,
    userRegister,
    userLogout,
    getBanners,
    getVideos,
    getAudios,
    profileDetails
};