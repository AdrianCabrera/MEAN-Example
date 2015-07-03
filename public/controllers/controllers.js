/**
 * [myApp Angular module]
 * @angular.module {[angular.module]}
 */
 var myApp = angular.module('myApp', [])

 /**
  * First controller
  * @param  {[type]} $scope    [Scope of angular]
  * @param  {Object} $http     [To communicate with the server]
  */
  .controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  	var refresh=function(){  	
  		$http.get("/contactList").success(function(response){
  			console.log("I got the data I requested");
  			$scope.contactList = response;
  			$scope.contact = "";
  		});
  	};


  	refresh();
  	

  	$scope.addContact=function(){
  		console.log($scope.contact);
  		$http.post("/contactList",$scope.contact).success(function(response){
  			console.log(response);
  			refresh();
  		});
  	};

  	$scope.remove=function(id){
  		console.log(id);
  		$http.delete("/contactList/" + id).success(function(response){
  			console.log(response);
  			refresh();
  		});
  	};

  	$scope.edit=function(id){
  		console.log(id);
  		$http.get("/contactList/" + id).success(function(response){
  			$scope.contact = response;
  			console.log(response);
  		});
  	};

  	$scope.update=function(){
  		console.log($scope.contact._id);
  		$http.put("/contactList/" + $scope.contact._id,$scope.contact).success(function(response){
  			console.log(response);
  			refresh();
  		});
  	};
  	$scope.clear=function(){
  		$scope.contact = "";
  	};

  }]);
