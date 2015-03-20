(function() {
	angular.module('lab').controller('PacientesSearchController', function($scope, $auth, $state, $http, $stateParams, Pacientes) {

		$scope.resultadosBusqueda = null;

		if ($stateParams.rut_completo != null) {
			var value = $stateParams.rut_completo;
			Pacientes.buscar.by_rut({
				valor : parseInt((value) / 10)
			}, function(datos) {
				if (datos.rut != null) {
					paciente = datos.toJSON();
					$state.go('loginRequired.pacientes.info', {
						paciente_id : paciente.id,
						paciente : paciente
					});
				}
				else {
					$state.go('loginRequired.nuevo_paciente', {
						rut_completo : value
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

		$scope.displayed = [];

		$scope.callServer = function callServer(tableState) {
			$scope.displayed = [];
			$scope.isLoading = true;

			var pagination = tableState.pagination;

			var start = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.
			
			Pacientes.range.advanced({
				start : start,
				number : number
			}, tableState).
			$promise.then(function(result) {
				$scope.displayed = result.data;
				tableState.pagination.numberOfPages = result.numberOfPages;
				//set the number of pages so the pagination can update
				$scope.isLoading = false;
			});
		};

	});
})();
