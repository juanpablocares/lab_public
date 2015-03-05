angular.module('lab').controller('PacientesIndexController', ['$scope', '$auth', '$state', '$http', '$stateParams',
function($scope, $auth, $state, $http, $stateParams) {
	console.log($stateParams);
	$scope.buttonSubmit = false;
	$scope.user.editing = true;

	$scope.cambiarVentanaSinCambios = function() {
		$scope.user.editing = !$scope.user.editing;
		$scope.userModel = {
			nombre : $auth.user.nombre,
			apellido_paterno : $auth.user.apellido_paterno,
			apellido_materno : $auth.user.apellido_materno,
			direccion : $auth.user.direccion,
			telefono : $auth.user.telefono,
		};
		$scope.rutCompleto = $auth.user.rut + "" + $auth.user.rutdv;
	};

	$scope.guardarDatosPersonales = function(model) {
		$scope.buttonSubmit = true;
		$auth.updateAccount(model).then(function(resp) {
			// handle success response
			console.log("datos actualizados");
			$scope.buttonSubmit = false;
			$scope.user.editing = true;
		}).catch(function(resp) {
			// handle error response
			console.log('Error actualizando datos');
		});
	};
}]);
