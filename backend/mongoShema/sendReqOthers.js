const mongoose=require('mongoose');

const friendRequestShema=new mongoose.Schema({
userId:{
type:String,
required:[true,'userId is required'],

},

reqData:[
    {
     senderId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Passioner'
     },
     recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Passioner'
     },
     status:{
        type:String,
        default:'pending',
        enum:['accept','pending','cancel']
     },
     name:{
      type:String,
     }
    }
]

});

const sendRequestModel=mongoose.model('sendFriendReqOthers',friendRequestShema);

module.exports=sendRequestModel;