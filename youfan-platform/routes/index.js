var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login.html', {});
});
//router.get("/user",function(req,res){
//  res.send( 'Hello ,�ο�' );
//});

router.all("/login",function(req,res,next){
  console.log("�û���¼")
  res.render("login.html", {});
})
router.all("/reg",function(req,res,next){
  console.log("�û�ע��")
  res.render("reg.html", {});
})
router.all("/user/:username",function(req,res,next){
  console.log("����û�����"+req.params.username)
  next();
})
//һ��·���󶨶��·����Ӧ
router.get("/user/:username",function(req,res,next){
  //res.send( 'Hello ,'+req.params.username );
  console.log("һ��·�����·��  Next��Ӧ")
  next();
});
router.get("/user/:username",function(req,res){
  res.send( req.params.username+" now is:"+new Date().toString() );
});
module.exports = router;
