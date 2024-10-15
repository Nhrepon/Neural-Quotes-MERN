const jwt=require("jsonwebtoken");

exports.encodeToken = (email, userId) => {
  const key = "1234-abcd";
  const expire = { expiresIn: "30d" };
  const payload = { email: email, userId: userId };
  return jwt.sign(payload, key, expire);
};





exports.decodeToken=(token)=>{
  try{
    const key = "1234-abcd";
    const verify = jwt.verify(token, key);
    return verify;
  }
  catch (e) {
    return e;
  }
}