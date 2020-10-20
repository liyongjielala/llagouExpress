var express = require('express');
var controllerUser = require('../controller/user');
var getYZM = require('../common/yzm');
var router = express.Router();

//登录的功能
router.post('/login', controllerUser.login);
//注册的功能
router.post('/register', controllerUser.register);
//登出的功能
router.get('/logout', controllerUser.logout);
//验证码的功能
router.get('/yzm', getYZM);


module.exports = router;
