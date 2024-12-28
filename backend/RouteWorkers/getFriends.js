const { GlobalAccelerator } = require('aws-sdk');
const AsyncoronizeErrorHandler=require('../middileWares/AsyncoranizeErrorHandler');
const friendsModel = require('../mongoShema/friendsShema');
const userModel = require('../mongoShema/userShema');



const getFriends= AsyncoronizeErrorHandler(async(req,res,next)=>{
const userId=req.user._id;

const friends=await friendsModel.findOne({userId});



if(friends){
const friendsIds=friends.friendsIds.map(ele=>{return {_id:String(ele)}});
const resultData=await userModel.find({$or:friendsIds});
console.log(resultData)
return res.status(200).json({
friends:resultData
});

};

return res.status(200).json({
    friends:friends?friends:[]
});



});


module.exports=getFriends;