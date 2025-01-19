const {decodeToken} = require("./TokenHelper");


class ValidationUtility{
    static isEmail(email){
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        return emailRegex.test(email);
    }

    static isAdmin(token){
        try{
            let decode = decodeToken(token);
            if(decode != null){
                const {role} = decode;
                if(role === "admin"){
                    return true;
                }
            }
        }catch (e) {
            console.log(e.message);
        }
        return false;
    }




}

module.exports = ValidationUtility;