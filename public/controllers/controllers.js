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

  	$http.get("/contactList").success(function(response){
		  console.warn(response);
  		console.log("I got the data I requested");
  		$scope.contactList = response;
  		$scope.clear();
  	});
  	

  	$scope.addContact=function(){
  		console.log($scope.contact);
  		if($scope.contact){
  			$http.post("/contactList",$scope.contact).success(function(response){
  				console.log(response);
  				$scope.contactList.push(response);
  				$scope.clear();
  			});
  		}
  	};

  	$scope.remove=function(id){
  		console.log(id);
  		$http.delete("/contactList/" + id).success(function(response){
  			console.log(response);  			
  			for (var i = 0; i < $scope.contactList.length; i++) {
  				if($scope.contactList[i]._id == id){
  					$scope.contactList.splice(i, 1);
  					break;
  				}
  			}
  			$scope.clear();
  		});
  	};

  	$scope.edit=function(id){
  		console.log(id);
  		// $http.get("/contactList/" + id).success(function(response){
  		// 	$scope.contact = response;
  		// 	console.log(response);
  		// });

  		//Within the app, it's not necessary to call the server
  		var contact = $scope.contactList.filter(function(item) {
  			return item._id === id;
  		})[0];
  		$scope.contact = JSON.parse(JSON.stringify(contact)); 

  	};

  	$scope.update=function(){
  		console.log($scope.contact._id);
  		$http.put("/contactList/" + $scope.contact._id,$scope.contact).success(function(response){
  			console.log(response);

  			//Already on success, work within the app, it's not necessary to call the server
  			for (var i = 0; i < $scope.contactList.length; i++) {
  				if($scope.contactList[i]._id == $scope.contact._id){
  					$scope.contactList.splice(i, 1,response);
  					// $scope.contactList.push();
  					break;
  				}
  			}  
  			$scope.clear();
  		});
  	};

  	$scope.clear=function(){
  		$scope.contact = "";
  	};

  }]);
