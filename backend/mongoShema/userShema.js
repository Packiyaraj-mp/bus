const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const crypto=require('crypto');

const userShema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxlength:[50,'name is too long'],
    minlength:[3,'name should be more than 2 character'],
    match:[/^[a-zA-Z0-9]+$/,'User name contain only alphanumeric characters']
   
  },
  password:{
  type:String,
  required:true,
  minlength:[7,'password required more than 6 characters'],
  maxlength:[16,'password cannot exceed more than 16'],
  

  },
  email:{
    type:String,
    required:true,
    match:[/^\S+@\S+\.\S+$/,'please provide a valid email'],
    unique:true,

  }

});

userShema.methods.getJwtToken= function(){
return jwt.sign({id:this.id},process.env.JWT_SECRET,{
expiresIn:process.env.JWT_EXPIRE
})
};

userShema.pre('save',async function(next){
  if(!this.isModified('password')){
   next()
  }
  this.password=await bcrypt.hash(this.password,10);
  
});

userShema.methods.isValidPassword=function(enteredPass){
  return bcrypt.compare(enteredPass,this.password)
}


const userModel=mongoose.model('Passioner',userShema);

module.exports=userModel;