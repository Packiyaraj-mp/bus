const mongoose=require('mongoose');

const uploadVideoShema=new mongoose.Schema({
poster:{
type:String,
required:[true,'poster name is required']
},
videoKey:{
type:String,
required:[true,'video key is required']
},
text:{
type:String
},
posterId:{
type:mongoose.SchemaTypes.ObjectId,
required:[true,'posterId is required']
},

dimention:{
type:String,
required:true
},
createdAt:{
type:Date,
default:()=>new Date().toDateString()
}
});

const videoPostModel=mongoose.model('uploadVideo',uploadVideoShema);
module.exports=videoPostModel;