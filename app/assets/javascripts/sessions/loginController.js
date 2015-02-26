angular.module('lab').controller('LoginController', function($scope, $auth, $state, $location) {
	$scope.login = {
	};
	$scope.errorMessage = false;
	//Detectar cambios en el modelo login
	$scope.$watchCollection('login', function(newCredentials, oldCredentials) {
		$scope.errorMessage = false;
	});
	
	$scope.submitLoginForm = function(loginCredentials) {
		$auth.submitLogin(loginCredentials).then(function(resp) {
			window.location.href = "/";
		}).catch(function(resp) {
			// handle error response
			$scope.errorMessage = true;
		});
	};
});
