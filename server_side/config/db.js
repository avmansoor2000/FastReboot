const mongoose = require('mongoose');
const url = process.env.url


module.exports = async function connectDB(){
    try{
      await  mongoose.connect(url,{

        })
            console.log("database connected");

    }catch(err){
        console.error(err);
    }
}