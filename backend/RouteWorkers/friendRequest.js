const AsyncoronizeErrorHandler=require('../middileWares/AsyncoranizeErrorHandler');
const FriendRequestModel = require('../mongoShema/friendRequestShema');
const sendRequestModel = require('../mongoShema/sendReqOthers');

const FriendRequest=(AsyncoronizeErrorHandler(
    async(req,res,next)=>{
    const {userId,senderId,recieverId,name}=req.body;
    
    const reqExistInSenderBox=await FriendRequestModel.findOne({userId});
    if(!reqExistInSenderBox){
    const newReq=await FriendRequestModel.create({
     userId,
     reqData:[
      {senderId,recieverId,name}
      ]
     });
    
    
    }else{
        
    const existReq=await FriendRequestModel.findOne({userId,'reqData.recieverId':recieverId}); 
    if(!existReq){
    await FriendRequestModel.findOneAndUpdate({userId:userId},{$push:{reqData:{senderId,recieverId,name}}}); 
    }
    };
    
    const sendReqExist=await sendRequestModel.findOne({userId:recieverId});
    if(!sendReqExist){
    await sendRequestModel.create({
     userId:recieverId,
     reqData:[
      {senderId,recieverId,name}
      ]
     });
    
    }else{
    const existReq=await sendRequestModel.findOne({userId:recieverId,'reqData.senderId':senderId}); 
    if(!existReq){
     await FriendRequestModel.findOneAndUpdate({userId:recieverId},{$push:{reqData:{senderId,recieverId,name}}}); 
     }   
    }
    
    res.status(200).json({
    success:true,
    id:recieverId
    })
    }));

    module.exports=FriendRequest;