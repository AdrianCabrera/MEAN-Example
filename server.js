var express = require('express');
var http = require('http');
var app = express();
var port=3000;

app.use(express.static(__dirname+"/public"));

app.listen(port,function(){
	console.log('Server runing on port: '+port);
})



app.get("/contactList",function(req,res){
	console.log("I received a GET request");
	
  	person1={
  		name:"Adri1",
  		email:"adrian1@test.com",
  		number:"111"
  	};
  	person2={
  		name:"Adri2",
  		email:"adrian2@test.com",
  		number:"222"
  	};
  	person3={
  		name:"Adri3",
  		email:"adrian3@test.com",
  		number:"333"
  	};

  	var contactList=[person1,person2,person3];
  	
	res.json(contactList);

});