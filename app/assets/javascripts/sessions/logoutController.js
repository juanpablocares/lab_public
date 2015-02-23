angular.module('lab').controller('LogoutController', function($scope, $auth, $location) {
	$auth.signOut().then(function() {
		console.log("Usuario deslogueado satisfactoriamente.");
		$location.path('/home');
	}).catch(function() {
		console.log("Error al desloguear al usuario");
		$location.path('/login');
	});
}); 