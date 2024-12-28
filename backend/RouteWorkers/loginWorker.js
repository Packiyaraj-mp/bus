const AsyncoronizeErrorHandler = require("../middileWares/AsyncoranizeErrorHandler");
const GlobalErrorClass = require("../middileWares/errorClass");
const userModel = require("../mongoShema/userShema");
const sendToken = require("../utils/sendToken");

exports.loginWorker=AsyncoronizeErrorHandler(async(req,res,next)=>{
const {email,password}=req.body;

if(email,password){

const authUser=await userModel.findOne({email:{$regex:new RegExp(email,'i')}});
if(!authUser){
  return  next(new GlobalErrorClass(400,"invalid Credentials"))
}
if(authUser.isValidPassword(password)){
  sendToken(authUser,200,res)
}


}else{
 return next(new GlobalErrorClass(400,"required all fields"));
}

});