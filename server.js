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