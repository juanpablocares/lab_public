angular.module('lab').controller('ResultadosMuestrasTomadasController', function($scope, $http, $stateParams, $auth, $state, DetallesFicha) {

	$scope.muestras = [];
	
	$scope.callServer = function callServer(tableState) {
		$scope.isLoading = true;
	
		var pagination = tableState.pagination;
	
		var start = pagination.start || 0;
		// This is NOT the page number, but the index of item in the list that you want to use to display the table.
		var number = pagination.number || 10;
		// Number of entries showed per page.
	
		DetallesFicha.muestras_tomadas.advanced({
			start : start,
			number : number
		}, tableState).$promise.then(function(result) {
			$scope.muestras = result.data;
			tableState.pagination.numberOfPages = result.numberOfPages;
			$scope.isLoading = false;
			
			console.log(result);
			console.log($scope.muestras);
		});
	};
});
