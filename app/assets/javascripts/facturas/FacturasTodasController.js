(function() {
	angular.module('lab').controller('FacturasTodasController', function($scope, $auth, $state, $http, $stateParams, DetallesPagoFicha) {

		$scope.resultadosBusqueda = null;
		$scope.seleccionar_todos = false;
		$scope.displayed = [];
		$scope.total_factura = 0;
		$scope.total_fichas = 0;
		$scope.total_bonos = 0;
		
		$http.get('/api/previsiones').success(function(data) {
			$scope.plans = data.previsiones;
		}).error(function(data) {
			// log error
		});
		
		$http.get('/api/tipos_pago').success(function(data) {
			$scope.tipos_pagos = data.data;
		}).error(function(data) {
			// log error
		});
		
		$scope.callServer = function callServer(tableState) {
			$scope.displayed = [];
			$scope.isLoading = true;

			var pagination = tableState.pagination;

			var start = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.
			
			DetallesPagoFicha.range.advanced({
				start : start,
				number : number,
				facturadas : 1
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
