angular.module('lab').controller('PacientesSearchController', function($scope, $auth, $state, $http, $stateParams, Pacientes) {

	$scope.resultadosBusqueda = [{"id":52,"rut":"45645645","rutdv":"6","nombre":"Juanito","apellido_paterno":"el","apellido_materno":"mañoso","celular":"12345678","telefono":null,"direccion":"gh","comuna_id":513,"fecha_nacimiento":"1987-10-15T00:00:00.000Z","genero":1,"diagnostico":"sdddd","prevision_id":1,"user_id":17,"creado":"2015-02-20T15:08:40.957Z","rut_completo":"456456456","prevision_nombre":"Banmedica"},{"id":57,"rut":"78978978","rutdv":"9","nombre":"eliberto","apellido_paterno":"s","apellido_materno":"s","celular":"23456789","telefono":null,"direccion":"sdfg","comuna_id":89,"fecha_nacimiento":"2000-10-10T04:00:00.000Z","genero":1,"diagnostico":"sdfghj","prevision_id":2,"user_id":17,"creado":"2015-02-20T15:08:40.957Z","rut_completo":"789789789","prevision_nombre":"Vida Tres"}];
	$scope.resultadosBusqueda = null;

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
