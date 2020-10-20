var express = require('express');
var controllerPost = require('../controller/post');
var router = express.Router();
var multer = require('multer')  //用于接收上传文件额第三方node模块
var upload = multer({ dest: './public/uploads/' }) //接收到文件存放我的位置

// 职位添加的功能

router.post('/add', upload.single('companyLogo'),controllerPost.add);
//职位更新功能
router.post('/update', upload.single('companyLogo'),controllerPost.update);
//职位删除功能
router.get('/remove',controllerPost.remove);



module.exports = router;
