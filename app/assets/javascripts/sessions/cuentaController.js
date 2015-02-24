angular.module('lab').controller('LoginController', function($scope, $auth, $state) {
	$scope.login = {
	};
	$scope.errorMessage = false;

	console.log('loginController');

	//Detectar cambios en el modelo login
	$scope.$watchCollection('login', function(newCredentials, oldCredentials) {
		$scope.errorMessage = false;
	});

	$scope.submitLoginForm = function(loginCredentials) {
		$auth.submitLogin(loginCredentials).then(function(resp) {
			// handle success response
			console.log("Conectado satisfactoriamente");
			console.log(resp);
			$state.go('loginRequired.index');
		}).catch(function(resp) {
			// handle error response
			$scope.errorMessage = true;
		});
	};
});
