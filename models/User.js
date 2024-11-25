const mongoose=require("mongoose");

const userschema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","moderator","client"],
        default: "client",
    }
});

module.exports=mongoose.model("User",userschema);