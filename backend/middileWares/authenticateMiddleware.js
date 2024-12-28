const jwt = require("jsonwebtoken");
const AsyncoronizeErrorHandler = require("./AsyncoranizeErrorHandler");
const userModel = require("../mongoShema/userShema");
const GlobalErrorClass = require("./errorClass");

const authenticate=AsyncoronizeErrorHandler(
async(req,res,next)=>{
if(req.cookies.authKey.length>0){
console.log(req.cookies.authKey)
const parsedData=JSON.parse(req.cookies.authKey);
const decoded=jwt.verify(parsedData.value,process.env.JWT_SECRET);
const user=await userModel.findOne({_id:decoded.id});
if(user.length<1){
return next(new GlobalErrorClass(400,'login to handle this resource'))
}


req.user=user;
next();
}

});

module.exports=authenticate;