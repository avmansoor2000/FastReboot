const mongoose = require('mongoose');

const url = 'mongodb+srv://avmansoor2023:acG1J2tg6mnq09Lu@cluster1.ddtriws.mongodb.net/FastReboot?retryWrites=true&w=majority';


module.exports = async function connectDB(){
    try{
      await  mongoose.connect(url,{

        })
            console.log("database connected");

    }catch(err){
        console.error(err);
    }
}