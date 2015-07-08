(function() {
	angular.module('lab').controller('TarifasExamenSearchController', function($scope, $auth, $state, $http, $stateParams, TarifasExamen, TarifaExamen) {
		$scope.displayed = [];
		var indice = -1;
		$scope.editar = false;
		$scope.editarTarifaExamen = function(i, tarifa_examen_input){
			indice = i;
			$scope.editar = true;
			console.log(tarifa_examen_input);
			$scope.tarifa_examen = tarifa_examen_input;
			/*$http.get('/api/tarifas_examen/' + tarifa_examen_id).success(function(data) {
				$scope.tarifa_examen = data.tarifa_examen;
				console.log($scope.tarifa_examen);
			}).error(function(data) {
				$state.go('loginRequired.index');
			});*/
		}
		
		$scope.guardarDatosEditarTarifaExamen = function(tarifa_examen){
			
			TarifaExamen.update({id:tarifa_examen.id}, tarifa_examen).
			$promise.
				then(function(response) {
					$scope.displayed[indice].precio = tarifa_examen.precio;
					$scope.displayed[indice].precio_fonasa = tarifa_examen.precio_fonasa;
					console.log("Edicion de Tarifa Examen");
				}, function(response) {
					console.log("ERROR editando tarifa");
					$scope.resetTarifaExamen();
				});
			//callServer();
			$scope.editar = false;
		}
		
		$scope.resetTarifaExamen = function() {
			$state.go('loginRequired.tarifas.examenes');
		};
		
		$scope.cambiarVentanaSinCambios = function() {
			$scope.editar = !$scope.editar;
			$scope.resetTarifaExamen();
		};
		
		$scope.callServer = function callServer(tableState) {
			$scope.displayed = [];
			$scope.isLoading = true;

			var pagination = tableState.pagination;

			$scope.comienzo_tabla = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.
			
			TarifasExamen.range.advanced({
				tarifa_id : $stateParams.tarifa_id,
				start : $scope.comienzo_tabla,
				number : number
			}, tableState).
			$promise.then(function(result) {
				console.log(result);
				$scope.displayed = result.data;
				tableState.pagination.numberOfPages = result.numberOfPages;
				//set the number of pages so the pagination can update
				$scope.isLoading = false;
			});
		};

	});
})();
