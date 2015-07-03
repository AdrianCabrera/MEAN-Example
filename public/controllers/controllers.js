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



  }]);
