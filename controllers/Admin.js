const User = require("../models/User");

exports.getAllusers=async(req,res)=>{
    try
    {
        const email=req.user.email;
        const users=await User.find({ email: { $ne: email } });
        return res.status(200).json({
            success:true,
            Users:users,
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

exports.updateRole=async(req,res)=>{
    try
    {
        const email=req.body.email;
        const newrole=req.body.role;
        const user = await User.findOneAndUpdate(
            { email: email }, 
            { role: newrole }, 
            { new: true, runValidators: true }  // Ensure to return the updated document
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Role updated successfully",
            user: user,
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

exports.getUserbyid=async(req,res)=>{
    try
    {
        const userId = req.params.id;
        const user=await User.findOne({_id:userId});
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