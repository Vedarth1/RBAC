const bcrypt=require("bcrypt");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
require("dotenv").config();

//signup
exports.signup=async(req,res)=>{
    try{

        const {email,password,confirmpassword, role}=req.body;
        //check if user already exist
        const existinguser=await User.findOne({email});

        if(existinguser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exist",
            });
        }

        let hashedpassword;
        try{
            hashedpassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            });
        }

        //create entry;
        const user=await User.create({
            email,password:hashedpassword,role
        });

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be register , please try again later",
        });
    }
}


//login
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        
        //check for registered user
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            });
        }

        //verify password and generate a JWT token
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        }; 

        if(await bcrypt.compare(password,user.password))
        {
            //password match;
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
            
            //editing in user object only not in database
            user.token=token;
            user.password=undefined;
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
            }
            //set a cookie in the user's browser when they interact with your backend server
            res.cookie("Cookie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });
        }
        else
        {
            //password not matched
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure",
        });
    }
}