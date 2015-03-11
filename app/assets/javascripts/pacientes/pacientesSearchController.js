angular.module('lab').controller('PacientesSearchController', function($scope, $auth, $state, $http, $stateParams, Pacientes) {

	$scope.resultadosBusqueda = [];

	if ($stateParams.rut_completo != null) {
		var value = $stateParams.rut_completo;
		Pacientes.buscar.by_rut({
			valor : parseInt((value) / 10)
		}, function(datos) {
			if (datos.rut == null) {
				$rootScope.rut_completo = value;
				$state.go('loginRequired.nuevo_paciente', {
					rut_completo : value
				});
			}
			else {
				paciente = datos.toJSON();
				$state.go('loginRequired.pacientes.info', {
					paciente_id : paciente.id,
					paciente : paciente
				});
			}
		});
	}

	if ($stateParams.text != null) {
		var value = $stateParams.text;
		Pacientes.buscar.by_text({
			valor : value
		}, function(datos) {
			angular.forEach(datos, function(value, key) {
				console.log(value.toJSON());
			});
			if (datos.length == 1) {
				paciente = datos[0].toJSON();
				$state.go('loginRequired.pacientes.info', {
					paciente_id : paciente.id,
					paciente : paciente
				});
			}
			else {
				//Mostrar lista de resultados
				$scope.resultadosBusqueda = datos;
			}
		});
	}
});
