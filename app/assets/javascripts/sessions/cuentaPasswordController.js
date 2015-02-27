angular.module('lab').controller('CuentaPasswordController', ['$scope', '$auth', '$state', '$http',
function($scope, $auth, $state, $http) {
	$scope.changePasswordModel = {	
		current_password : "",
		password : "",
		password_confirmation : ""
	};
	
	$scope.changePasswordFormSubmit = function()
	{
		$auth.updatePassword($scope.changePasswordModel)
        .then(function(resp) { 
          // handle success response
        })
        .catch(function(resp) { 
          // handle error response
        });
	};
}]);
