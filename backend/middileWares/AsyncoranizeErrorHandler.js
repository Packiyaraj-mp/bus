const AsyncoronizeErrorHandler=(fun)=>async(req,res,next)=>Promise.resolve(fun(req,res,next)).catch(next);


module.exports= AsyncoronizeErrorHandler;