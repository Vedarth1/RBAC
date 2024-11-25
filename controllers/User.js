const User = require("../models/User");

exports.getUser=async(req,res)=>{
    try
    {
        const email=req.user.email;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not Found!",
            });
        }

        return res.status(200).json({
            success:true,
            User:user,
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
}