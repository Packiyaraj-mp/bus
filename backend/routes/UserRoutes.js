
const authenticateWorker = require('../RouteWorkers/authenticateRouter');
const { loginWorker } = require('../RouteWorkers/loginWorker');
const { registerWorker } = require('../RouteWorkers/registerWorker');

const authenticate = require('../middileWares/authenticateMiddleware');

const router=require('express').Router();

router.route('/register').post(registerWorker);

router.route('/login').post(loginWorker);

router.route('/authenticate').get(authenticate,authenticateWorker);
module.exports=router;

