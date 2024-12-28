const AsyncoronizeErrorHandler = require("../middileWares/AsyncoranizeErrorHandler");

const authenticateWorker=AsyncoronizeErrorHandler((req,res,next)=>{
if(req.user){
    res.status(200).json({
     user:req.user,
     success:true
    })
}
});

module.exports=authenticateWorker;