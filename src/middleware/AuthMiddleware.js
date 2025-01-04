
const {decodeToken} = require("../utility/TokenHelper");
const UserModel = require("../model/UserModel");

const AuthMiddleware=(req, res, next)=>{
    try {
        let token=req.cookies['token'];

        !token? token = req.headers['token'] : req.cookies["token"];

        const decode=decodeToken(token);

        if(decode != null){
            const {email, userId, role}=decode;
            const user = UserModel.findOne({_id: userId});
            console.log(user['data']);
            if(user['data'].length > 0 ){
                req.headers.email=email;
                req.headers.userId=userId;
                req.headers.role=role;
                next();
            }
            return res.json({status:"failed", data:"Unauthorized user"});
        }else{
            return res.status(401).json({status:"fail", data:"Unauthorized user"});
        }

    } catch (error) {
        return {status:"fail", data:error}
    }
}



module.exports=AuthMiddleware;