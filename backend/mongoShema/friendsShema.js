const mongoose=require('mongoose');

const friendsSchema=new mongoose.Schema({
userId:{
type:mongoose.Schema.Types.ObjectId,
required:true
},
friendsIds:[mongoose.Schema.Types.ObjectId]

})

const friendsModel=mongoose.model('friends',friendsSchema);
module.exports=friendsModel;