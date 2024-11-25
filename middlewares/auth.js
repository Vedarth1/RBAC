const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{
        //extract JWT token
        //other ways to fetch token
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token missing',
            });
        }

        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            //storing payload in response
            req.user=payload;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        });
    }
}

exports.isClient=(req,res,next)=>{
    try{
        if(req.user.role!=="client")
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for client',
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'Server Error',
        });
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="admin")
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for admin',
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'Server Error',
        });
    }
}

exports.isModerator=(req,res,next)=>{
    try{
        if(req.user.role!=="moderator")
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for moderator',
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'Server Error',
        });
    }
}