angular.module('lab').controller('CuentaIndexController', ['$scope', '$auth', '$state', '$http',
function($scope, $auth, $state, $http) {
	console.log($auth.user);

	$scope.buttonSubmit = false;
	$scope.user.editing = true;
	$scope.rutCompleto = $auth.user.rut + "" + $auth.user.rutdv;
	$scope.email = $auth.user.email;

	$scope.userModel = {
		nombre : $auth.user.nombre,
		apellido_paterno : $auth.user.apellido_paterno,
		apellido_materno : $auth.user.apellido_materno,
		direccion : $auth.user.direccion,
		telefono : $auth.user.telefono,
		rutCompleto : $auth.user.rut + "" + $auth.user.rutdv,
		email : $auth.user.email
	};

	$scope.rutToTexto = function(mod) {
		mod = $auth.user;
		var rutTexto = mod.rutdv + "-";
		var s = "";
		var temp = mod.rut.toString();
		for (var i = temp.length - 1,
		    j = 0; i >= 0; i--, j++) {
			if (j % 3 == 0 && j != 0)
				s = s + ".";
			s = s + "" + temp[i];
		}
		s = rutTexto + s;
		for (var i = s.length - 1,
		    o = ''; i >= 0; o += s[i--]) {
		}
		return o;
	}

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
