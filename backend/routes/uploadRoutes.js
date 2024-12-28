
const authenticate = require('../middileWares/authenticateMiddleware');
const getVideosWorker = require('../RouteWorkers/getVideosWorker');
const  uploadWorker = require('../RouteWorkers/uploadVideoWorker');



const router=require('express').Router();

router.route('/uploadVideo').post(authenticate,uploadWorker);

router.route('/getVideos').get(authenticate,getVideosWorker);

module.exports=router;