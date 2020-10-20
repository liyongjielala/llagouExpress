var express = require('express');
var controllerIndex = require('../controller/index');
var router = express.Router();

// 访问 login 页面
router.get('/login',controllerIndex.login);

//访问 register 页面
router.get('/register',controllerIndex.register);

//访问 admin 页面
router.get('/admin',controllerIndex.admin);
router.get('/admin/postedit/:page',controllerIndex.admin_postedit);
router.get('/admin/postadd',controllerIndex.admin_postadd);
router.get('/admin/postupdate/:postId',controllerIndex.admin_postupdate);  //配置动态路由


// MVC ： Model (数据)   View(视图)    Controller(控制器)
//    Controller(控制器) : 中间层去连接 M 和 V。

module.exports = router;
