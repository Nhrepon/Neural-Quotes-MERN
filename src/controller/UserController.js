const UserModel = require("../model/UserModel");

exports.userRegistration = async (req, res)=>{
    try {
        const reqBody = req.body;
        const data = await UserModel.create(reqBody);
        res.json({status:"success", data:data});
    }catch (e) {
        res.json({status:"failed", message:e});
    }
}