const jwt=require("jsonwebtoken");

exports.encodeToken = (email, userId, role) => {
  const key = "1234-abcd";
  const expire = { expiresIn: "30d" };
  const payload = { email: email, userId: userId , role: role };
  return jwt.sign(payload, key, expire);
};





exports.decodeToken=(token)=>{
  try{
    const key = "1234-abcd";
    return jwt.verify(token, key);
  }
  catch (e) {
    return e;
  }
}