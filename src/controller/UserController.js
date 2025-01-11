const UserModel = require("../model/UserModel");
const ProfileModel = require("../model/ProfileModel");
const {encodeToken} = require("../utility/TokenHelper");



exports.userRegistration=async (req, res)=>{
    try{
        const reqBody=req.body;
        //res.json({status:"success", message:"User registration success ... ", data:reqBody});
        const user = await UserModel.find({email:reqBody.email})
        if (user.length > 0){
            res.json({status:"duplicate"});
        }else {

            const data= await UserModel.create(reqBody);
            const profileData = {};
            profileData.userName = data.email;
            profileData.userId = data._id;
            await ProfileModel.create(profileData);

            res.json({status:"success", message:"User registration success ... "});
        }



    }catch(error){
        res.json({status:"error", data:error});
    }
}




exports.userLogin=async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.find({email: email, password: password});

        if (user.length > 0){
            const userId = user[0]._id;
            const role = user[0].role;
            const token = encodeToken(email,userId,role);
            const cookieOption = {expires:new Date(Date.now()+30*24*60*60*1000), httpOnly:false};
            res.cookie("token", token, cookieOption);
            res.json({status: "success", token: token});
        }else {
            res.json({status: "userNotFound"});
        }


    } catch (error) {
        res.json({status:"error", data:error});
    }
}




exports.userProfileRead=async (req, res)=>{
    try {
        const {userId} = req.headers;

        const user=await UserModel.findOne({_id:userId}, {password:0});
        const profile = await ProfileModel.findOne({userId:userId}, {_id:0, userId:0});

        res.json({status:"success", user:user, profile:profile});
    } catch (error) {
        res.json({status:"error", data:error});
    }
}





exports.userProfileUpdate=async (req, res)=>{
    try {
        const {userId}=req.headers;
        const reqBody=req.body;
        const data=await ProfileModel.updateOne({userId:userId}, reqBody);
        res.json({status:"success", data:data});
    } catch (error) {
        res.json({status:"Error", data:error});
    }
}






exports.userProfileDelete=async (req, res)=>{
    try {
        const {id}=req.params;
        const data=await UserModel.deleteOne({_id:id});
        res.json({status:"Success", data:data});
    } catch (error) {
        res.json({status:"Error", data:error});
    }
}















exports.userVerify=async (req, res)=>{
    try {

        res.json({status:"Success", data:data});
    } catch (error) {
        res.json({status:"Error", data:error});
    }
}






exports.userLogout=async (req, res)=>{
    try {
        const cookieOption = {expires: new Date(Date.now()-30*24*60*60*1000), httpOnly: false};
        res.cookie("token", " ", cookieOption);
        //res.clearCookie("token");
        res.json({status:"success", message:"Logout success"});
    } catch (error) {
        res.json({status:"error", data:error});
    }
}