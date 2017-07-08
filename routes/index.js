var express = require('express');
var router = express.Router();
var url = require('url');
//引入mongoose处理数据库
var mongoose = require('mongoose');
//与Resource数据库建立连接
mongoose.connect("mongodb://localhost/Resource");
//构造存入数据库的数据模板
var Schema = mongoose.Schema;
var newData = new Schema({
	title:{type:String,unique:true},
	date:Date,
	type:String,
	introduce:String,
	image:String,
	url:String
});
//建立一个存入movie集合的数据
var Data = mongoose.model('movie',newData);

/* 获取主页 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '天使与魔鬼' });
});
//获取上传页面
router.get('/insert',function(req,res,next){
	res.render('insert',{title:'天使与魔鬼'});
});
//进入一个详情页
router.get('/detail',function(req,res,next){
	var arg = req.url;
	var key = arg.split("=")[1];
	Data.find({title:key},function(err,newData){
		var data = newData[0]
		if(err){
			console.log(err);
		}else{
			res.render('detail',{
				title:data.title,
				date:data.date,
				type:data.type,
				introduce:data.introduce,
				image:data.image,
				url:data.url
			});
		}
	})
	/*res.render('detail',{
		title:key,
		date:"data.date",
		type:"data.type",
		introduce:"data.introduce",
		image:"data.image",
		url:"data.url"
	})*/
})

//上传页面的post请求,处理数据然后将数据存入数据库
router.post('/insert',function(req,res,next){
	//如果数据不存在就将其存入数据库
	var data = new Data();
	console.log(req.body.title);
	var now = new Date();
	var date = now.getFullYear();
	data.set('title',req.body.title);
	data.set('date',date);
	data.set('type',req.body.type);
	data.set('introduce',req.body.introduce);
	data.set('image',req.body.image);
	data.set('url',req.body.url);
	data.save(function(err){
		if(err){
			res.redirect('/insert');
		}else{
			res.render('detail',{
				title:data.title,
				date:data.date,
				type:data.type,
				introduce:data.introduce,
				image:data.image,
				url:data.url
			});
		}
	})
});

module.exports = router;
