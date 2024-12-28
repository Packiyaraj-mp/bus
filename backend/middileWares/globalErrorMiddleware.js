const GlobalErrorMiddleWare=(err,req,res,next)=>{
   console.log(err)
    err.status=err.status || 500;
    let message=err.message;
    let error=new Error(message);
   
    if(err.code==11000){
    message=`${Object.keys(err.keyValue)} already exist`;
    error=new Error(message)
    };
   
    if(err.name==="ValidationError"){
     message=Object.values(err.errors).map(value=>value.message);
     error=new Error(message)
   
    }
    if(err.name==="CastError"){
      message=`Resource not found ${err.path}`;
      error=new Error(message);
      err.status=400
    }
   
    res.status(err.status).json({
      msg:error.message || 'internal server error'
     })
   
   
   };

   module.exports=GlobalErrorMiddleWare