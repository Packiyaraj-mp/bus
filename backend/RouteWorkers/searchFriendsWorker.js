const AsyncoronizeErrorHandler = require('../middileWares/AsyncoranizeErrorHandler');
const FriendRequestModel = require('../mongoShema/friendRequestShema');
const userModel = require('../mongoShema/userShema');

const searchFriendsWorker= AsyncoronizeErrorHandler(async(req,res,next)=>{
 const sendData=[];
 const userId=req.cookies.userId;
 const searchedUsers= await userModel.find({name:{$regex:req.query.key,$options:'i'},_id:{$ne:userId}},
 {_id:1,name:1}
 );
const fetchReq=await FriendRequestModel.findOne({userId});
if(fetchReq){
  const fetchWithValidate=fetchReq.reqData.map(ele=>String(ele.recieverId));
  const finalData=searchedUsers.map(ele=>{
  if(fetchWithValidate.includes(String(ele._id))){
    return {name:ele.name,_id:ele._id,status:'pending'}
  }else{
    return {name:ele.name,_id:ele._id,status:null}
  }
  });
  return res.status(200).json({
    friends:finalData
   })
}




return res.status(200).json({
  friends:searchedUsers
 })
 
});

module.exports=searchFriendsWorker;