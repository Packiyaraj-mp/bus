const authenticate = require('../middileWares/authenticateMiddleware');
const searchFriendsWorker = require('../RouteWorkers/searchFriendsWorker');

const router=require('express').Router();
router.route('/friends').get(searchFriendsWorker);
module.exports=router;