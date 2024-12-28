const { default: mongoose } = require("mongoose");

const awsSchema=new mongoose.Schema({
   
    aws_access_key:{type:String,required:true},
    aws_secret_access_key:{type:String,required:true},
    region:{type:String,required:true}
});

const awsIamModel=mongoose.model('awsIamUserKey',awsSchema);
module.exports=awsIamModel;