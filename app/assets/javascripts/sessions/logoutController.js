angular.module('lab').controller('LogoutController', function($scope, $auth, $state, $http) {
	$auth.signOut().then(function() {
		//console.log("Usuario deslogueado satisfactoriamente.");
		$state.go('login');
	}).catch(function() {
		alert("Error al desloguear al usuario");
	});
});
