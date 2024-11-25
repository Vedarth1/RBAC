const express=require("express");
const router=express.Router();

const {login,signup} = require("../controllers/Auth");
const { getUser } = require("../controllers/User");
const {auth,isClient,isAdmin,isModerator}=require("../middlewares/auth");
const { getAllusers, updateRole, getUserbyid } = require("../controllers/Admin");

router.post("/login",login);
router.post("/signup",signup);

router.get('/admin',auth,isAdmin,getUser);
router.get('/client',auth,isClient,getUser);
router.get('/moderator',auth,isModerator,getUser);

router.get('/admin/allusers',auth,isAdmin,getAllusers);
router.put('/admin/update',auth,isAdmin,updateRole);
router.get('/admin/getuser/:id',auth,isAdmin,getUserbyid);

module.exports=router;