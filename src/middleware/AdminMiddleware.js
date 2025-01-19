const {decodeToken} = require("../utility/TokenHelper");
const UserModel = require("../model/UserModel");

const AdminMiddleware =async (req, res, next) => {
    try {
        const token=req.cookies['token'] || req.headers['token'];

        if(!token){
            res.status(401).json({status:"token failed", message:"No token provided"});
        }
        const decode = await decodeToken(token);
        if(decode != null){
            const {email, userId, role} = decode;
            const data = await UserModel.findOne({_id: userId, role:"admin"});

            if(data != null && role === "admin"){
                req.headers.email=email;
                req.headers.userId=userId;
                req.headers.role=role;
                next();
            }else {
                return res.json({status:"unauthorized", message:"Unauthorized user. Only admin can process this operation!"});
            }
        }else{
            return res.status(401).json({status:"fail", message:"Unauthorized user"});
        }
    }catch (e) {
        return {status:"fail", message:e.message}
    }
};

module.exports = AdminMiddleware;