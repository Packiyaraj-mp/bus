const AsyncoronizeErrorHandler=require('../middileWares/AsyncoranizeErrorHandler');
const sendRequestModel = require('../mongoShema/sendReqOthers');


const getFriendReq=AsyncoronizeErrorHandler(async(req,res,next)=>{
    const userId=req.cookies.user;
   
   const fetchReq=await sendRequestModel.find({userId,'reqData.status':{$ne:'accept'}}).limit(10);
   if(fetchReq){
    res.status(200).json({
        friends:fetchReq
       })
   }
   return;
  
});

module.exports=getFriendReq;