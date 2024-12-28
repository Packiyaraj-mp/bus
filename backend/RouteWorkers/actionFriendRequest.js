const AsyncoronizeErrorHandler=require('../middileWares/AsyncoranizeErrorHandler');
const FriendRequestModel = require('../mongoShema/friendRequestShema');
const friendsModel = require('../mongoShema/friendsShema');
const sendRequestModel = require('../mongoShema/sendReqOthers');


const ActionFrdReq=AsyncoronizeErrorHandler(async(req,res,next)=>{
    const {senderId,recieverId,condition}= req.body;
    
    if(condition==='cancel'){
        const data=await sendRequestModel.findOneAndDelete({userId:recieverId,'reqData.senderId':senderId});
        await sendRequestModel.findOneAndDelete({userId:senderId,'reqData.senderId':recieverId});
       
        const reqExist=await FriendRequestModel.exists({userId:senderId,'reqData.recieverId':recieverId});
        if(reqExist){
         const pullDoc=await FriendRequestModel.updateOne({userId:senderId},{$pull:{reqData:{senderId:senderId}}});
         const sendingdata=await sendRequestModel.find({userId:recieverId}).limit(10);
         res.status(200).json({
            friends:sendingdata
         })
        }
       
       return;
    }
      const data=await sendRequestModel.findOneAndUpdate({userId:recieverId,'reqData.senderId':senderId},
        {$set:{'reqData.$.status':'accept'}},{new:true});
        const pulldoc=await FriendRequestModel.findOneAndUpdate({userId:senderId,
         'reqData.recieverId':recieverId},{$set:{'reqData.$.status':'accept'}},{new:true});

        const fetchFriendRec=await friendsModel.find({userId:recieverId});
        const fetchSendFriendRec=await sendRequestModel.find({userId:senderId});

        if(fetchFriendRec.length<1){
        const addFrdRec= await friendsModel.create({
        userId:recieverId,
        friendsIds:[senderId]
        });
        console.log('new data:',addFrdRec);
        }else{
         const addNewFrd=await friendsModel.updateOne({userId:recieverId},{$push:{friendsIds:senderId}}) ;
         console.log('updatedata:',addNewFrd);
        }


        if(fetchSendFriendRec.length<1){
         const addFrdRec= await friendsModel.create({
         userId:senderId,
         friendsIds:[recieverId]
         });
         console.log('new data:',addFrdRec);
         }else{
          const addNewFrd=await friendsModel.updateOne({userId:senderId},{$push:{friendsIds:recieverId}}) ;
          console.log('updatedata:',addNewFrd);
         }
         
        const sendingdata=await sendRequestModel.find({userId:recieverId,'reqData.status':{$ne:'accept'}}).limit(10);
        res.status(200).json({
           friends:sendingdata
        });
    });


    module.exports=ActionFrdReq;