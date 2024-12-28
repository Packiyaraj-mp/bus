const AsyncoronizeErrorHandler = require('../middileWares/AsyncoranizeErrorHandler');
const authenticate = require('../middileWares/authenticateMiddleware');
const FriendRequestModel = require('../mongoShema/friendRequestShema');
const friendsModel = require('../mongoShema/friendsShema');
const sendRequestModel = require('../mongoShema/sendReqOthers');
const userModel = require('../mongoShema/userShema');
const ActionFrdReq = require('../RouteWorkers/actionFriendRequest');
const FriendRequest = require('../RouteWorkers/friendRequest');
const getFriendReq = require('../RouteWorkers/getFriendRequest');
const getFriends = require('../RouteWorkers/getFriends');


const router=require('express').Router();

router.route('/request').post(FriendRequest);


router.route('/getFriendRequest').get(getFriendReq);

router.route('/actionFriendRequest').post(ActionFrdReq);


router.route('/getFriends').get(authenticate,getFriends);

module.exports=router;