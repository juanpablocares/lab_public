(function() {
	angular.module('lab').controller('PacientesSearchController', function($scope, $auth, $state, $http, $stateParams, Pacientes, Previsiones, previsionesService) {

		$scope.resultadosBusqueda = null;
		$scope.stCtrl = null;
		

		if(!previsionesService.getPrevisiones())
		{
			Previsiones.all.get().$promise.then(function(data) {
				previsionesService.setPrevisiones(data.previsiones);
				$scope.plans = previsionesService.getPrevisiones();
			}, function(data) {
				console.log('Error getting previsiones');
			});
		}
		else
		{
			$scope.plans = previsionesService.getPrevisiones();
		}
		
		if ($stateParams.rut_completo != null) {
			var value = $stateParams.rut_completo;
			Pacientes.buscar.all({
				valor : value
			}, function(response) {
				console.log(response);
				if (response.data != null && response.data.rut != null) {
					paciente = response.data;
					$state.go('loginRequired.pacientes.info', {
						paciente_id : paciente.id,
						paciente : paciente
					});
				}
				else {
					$state.go('loginRequired.nuevo_paciente', {
						rut_completo : value,
						desde_barra: true 
					});
				}
			});
		}

		if ($stateParams.text != null) {
			var value = $stateParams.text;
			Pacientes.buscar.all({
				valor : value
			}, function(response) {
				if (response.data.length == 1) {
					console.log('Encontrado 1 paciente');
					paciente = response.data[0];
					$state.go('loginRequired.pacientes.info', {
						paciente_id : paciente.id,
						paciente : paciente
					});
				}
				else {
					console.log('encontrados varios pacientes');
				}
			});
		}

		$scope.displayed = [];

		$scope.callServer = function callServer(tableState, ctrl) {
			$scope.displayed = [];
			$scope.isLoading = true;
			
			
			if ( !$scope.stCtrl && ctrl )
			{
				$scope.stCtrl = ctrl;
			}

			if( !tableState && $scope.stCtrl ) {
				$scope.stCtrl.pipe();
				return;
			}

			var pagination = tableState.pagination;
			
			if ($stateParams.text != null) {
				tableState.search.predicateObject = { apellido_paterno : angular.copy($stateParams.text)};
				$stateParams.text = null;
			}

			$scope.comienzo_tabla = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.
			
			Pacientes.range.advanced({
				start : $scope.comienzo_tabla,
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
