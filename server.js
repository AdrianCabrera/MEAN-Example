var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var port=3000;


var db = mongojs("contactList",["contactList"]);

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());

app.listen(port,function(){
	console.log('Server runing on port: '+port);
})

app.get("/contactList",function(req,res){
	console.log("I received a GET request");
	
	db.contactList.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post("/contactList",function(req,res){
	console.log("I received a POST request");
	console.log(req.body);
	db.contactList.insert(req.body,function(err,docs){
		res.json(docs);
	});
});

app.delete("/contactList/:id",function(req,res){
	console.log("I received a DELETE request");
	
	var id=req.params.id;
	console.log(id);
	
	db.contactList.remove({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.get("/contactList/:id",function(req,res){
	console.log("I received a GET request");
	
	var id=req.params.id;
	console.log(id);
	
	db.contactList.findOne({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.put("/contactList/:id",function(req,res){
	console.log("I received a PUT request");
	
	var id=req.params.id;
	console.log(req.body.name);
	
	db.contactList.findAndModify({
		query:
		{
			_id: mongojs.ObjectId(id)
		},
		update:
		{
			$set: {name:req.body.name,email:req.body.email,number:req.body.number}
		},
		new:true}, function(err,docs){
			res.json(docs);
		});
});