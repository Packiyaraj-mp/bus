

const sendToken=async(user,status,res)=>{
 const token=await user.getJwtToken();

 res.status(status).json({
 jwtToken:token,
 user,
 success:true
 })
}

module.exports=sendToken;