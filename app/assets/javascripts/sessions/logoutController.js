angular.module('lab').controller('LogoutController', function($scope, $auth, $state) {
	$auth.signOut().then(function() {
		console.log("Usuario deslogueado satisfactoriamente.");
		$state.go('loginRequired.index');
	}).catch(function() {
		console.log("Error al desloguear al usuario");
		$state.go('loginRequired.index');
	});
}); 