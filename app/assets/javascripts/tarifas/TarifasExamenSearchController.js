(function() {
	angular.module('lab').controller('TarifasExamenSearchController', function($scope, $auth, $state, $http, $stateParams, TarifasExamen, TarifaExamen) {
		$scope.displayed = [];
		
		$scope.editar = false;
		$scope.editarTarifaExamen = function(tarifa_examen_id){
			$scope.editar = true;
			console.log(tarifa_examen_id);
			
			$http.get('/api/tarifas_examen/' + tarifa_examen_id).success(function(data) {
				$scope.tarifa_examen = data.tarifa_examen;
				console.log($scope.tarifa_examen);
			}).error(function(data) {
				$state.go('loginRequired.index');
			});
		}
		
		$scope.guardarDatosEditarTarifaExamen = function(tarifa_examen){
			TarifaExamen.update({id:tarifa_examen.id}, tarifa_examen).
			$promise.
				then(function(response) {
					console.log("Edicion de Tarifa Examen");
				}, function(response) {
					console.log("ERROR editando tarifa");
					$scope.resetTarifaExamen();
				});
			callServer();
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

			var start = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.
			
			TarifasExamen.range.advanced({
				tarifa_id : $stateParams.tarifa_id,
				start : start,
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
