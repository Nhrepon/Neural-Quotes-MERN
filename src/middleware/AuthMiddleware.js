
const {decodeToken} = require("../utility/TokenHelper");
const UserModel = require("../model/UserModel");

const AuthMiddleware= async (req, res, next)=>{
    try {
        const token=req.cookies['token'] || req.headers['token'];

        if(!token){
            res.status(401).json({status:"token failed", error:"No token provided"});
        }

        //console.log(token);
        const decode = decodeToken(token);
        //console.log(decode);
        if(decode != null){
            const {email, userId, role} = decode;
            const data = await UserModel.findOne({_id: userId});

            if(data != null){
                req.headers.email=email;
                req.headers.userId=userId;
                req.headers.role=role;
                next();
            }
        }else{
            return res.status(401).json({status:"fail", data:"Unauthorized user"});
        }

    } catch (error) {
        return {status:"fail", data:error}
    }
}



module.exports=AuthMiddleware;