
const { RSA_NO_PADDING } = require('constants');
var fs = require('fs');
var path = require('path');
var PostModel = require('../model/post');
var CounterModel = require("../model/counter");
//添加
var add = async (req,res,next)=>{
    var body = req.body;
    var file = req.file; //得到上传的信息
    console.log(body)
    console.log(file)

    fs.renameSync(path.join('./public/uploads',file.filename),path.join('./public/uploads',file.filename + '.png'));//对上传后的图片进行重命名

   var {postId} = await CounterModel.findOneAndUpdate({},{$inc:{postId : 1}},{upsert:true,new:true});
  //  console.log(counter);

    var data = {
      ...body,
      companyLogo:'http://localhost:3000/uploads/'+file.filename + '.png',
      postId
    }
    //数据库的操作
    PostModel(data).save().then((info)=>{
      if(info){
        res.send('<script>alert("添加职位成功！！");history.back();</script>');
      }
    }).catch((err)=>{
      res.send("<script>alert('添加职位失败！');history.back();</script>")

    });
};
//更新
var update = (req,res,next)=>{
  var body = req.body;
  var file = req.file;

  if(file){ //修改了logo文件
    body.prevLogo = body.prevLogo.replace(/http:\/\/localhost:3000/,'./public');
    fs.unlinkSync(body.prevLogo);
    delete body.prevLogo;

    fs.renameSync(path.join('./public/uploads',file.filename),path.join('./public/uploads',file.filename + '.png'))

    var data = {
      ...body,
      companyLogo:'http://localhost:3000/uploads/ '+file.filename + '.png'
    };

    PostModel.update({postId :body.postId},{$set:data}).then((info)=>{
      res.send('<script>alert("更新成功！！！"); history.back();</script>');
    }).catch((err)=>{
      res.send('<script>alert("更新失败！！！"); history.back();</script>')
    })

  }else{
    PostModel.update({postId :body.postId},{$set :body}).then((info)=>{
      res.send('<script>alert("更新成功！！！"); history.back();</script>');
    }).catch((err)=>{
      res.send('<script>alert("更新失败！！！"); history.back();</script>')
    })
  }
}
var remove = (req,res,next)=>{
  var query = req.query;

  PostModel.deleteOne(query).then((info)=>{
    res.send({
      code:0,
      errmsg :'Ok'
    })
  }).catch((err)=>{
    res.send({
      code:-1,
      errmsg:"not remove"
    })

  })


}
module.exports = {
  add,
  update,
  remove
};