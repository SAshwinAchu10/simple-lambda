'use strict';


angular.module('app').controller('AppController', ['$scope','$http','appService','$rootScope',
	function($scope,$http,appService,$rootScope) {
		$scope.user = {};
		$scope.companyRegister = function(){
			  
        
        $http({
          method  : 'POST',
          url     : 'https://781yec3kra.execute-api.us-east-1.amazonaws.com/dev/todos/',
          data    : $scope.user,
         headers: {
'Content-Type':'application/json'

  }
 })
          .success(function(data) {
          	alert("success adding employee");
            if (data.errors) {
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });
        };
    

		$scope.companyUpdate = function(company, companyForm){    
        $http({
          method  : 'PUT',
          url     : 'https://781yec3kra.execute-api.us-east-1.amazonaws.com/dev/todos/', id:company._id, company, 
          data    : $scope.company,
         headers: {
	'Content-Type':'application/json'

  }
 })
          .success(function(data) {
          	alert("success adding employee");
            if (data.errors) {
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });
        };
		$scope.getAllCompany = function(){
			$http({method : 'GET',url : 'https://781yec3kra.execute-api.us-east-1.amazonaws.com/dev/todos/', headers: {
			'Content-Type': 'application/json'
			}})
            .success(function(data, status) {
            	alert("success getting employee");
               console.log("ashwin",angular.toJson(data));
               $rootScope.a=data;
               console.log("ashwin",angular.toJson($scope.a));
               

            })
            .error(function(data, status) {
                alert("Error");
            });
            };

		$scope.delete = function(id){
			$http({
    method: 'DELETE',
    url: 'https://781yec3kra.execute-api.us-east-1.amazonaws.com/dev/todos/' + id,
    data: {
        user: id
    },
    headers: {
        'Content-type': 'application/json;charset=utf-8'
    }
})
.then(function(response) {
	alert("success deleting employee");
}, function(rejection) {
    console.log(rejection.data);
});
}
		$scope.getAllCompany();
	}
]);