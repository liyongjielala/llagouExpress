
var UserModel = require('../model/user');
var getCrypto = require('../common/crypto');

var login = async (req,res,next)=>{
    //res.send('login');
    var { username , password , yzm } = req.body;
    if( yzm.toLowerCase() != req.session.captcha.toLowerCase() ){
        res.send('<script>alert("验证码输入有误"); location.href="/login"; </script>');
        return;
    }
    
    var info = await UserModel.findOne({
        username,
        password : getCrypto(password)
    });
    if(info){
        req.session.username = username; //写入session 
        res.send('<script>alert("登录成功！"); location.href="/admin"; </script>');
    }
    else{
        res.send('<script>alert("登录失败！"); location.href="/login"; </script>');
    }
};

var register = async (req,res,next)=>{
    //res.send('register');
    var { username , password } = req.body;
    //UserModel(body).save().then((info)=>{}).catch((err)=>{});
    var info = await UserModel({
        username , 
        password : getCrypto(password)
    }).save().catch((err)=>{
        res.send('<script>alert("注册失败！"); location.href="/register"; </script>');
    });
    if(info){
        res.send('<script>alert("注册成功！"); location.href="/login"; </script>');
    }
};
//退出登录的功能
var logout = (req,res,next)=>{
    req.session.username = null
    res.redirect("/login");
};

module.exports = {
    login,
    register,
    logout
};