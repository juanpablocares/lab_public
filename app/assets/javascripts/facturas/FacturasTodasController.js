(function() {
	angular.module('lab').controller('FacturasTodasController', function($scope, $auth, $state, $http, $stateParams, DetallesPagoFicha) {

		$scope.resultadosBusqueda = null;
		$scope.seleccionar_todos = false;
		$scope.displayed = [];
		$scope.total_factura = 0;
		$scope.total_fichas = 0;
		$scope.total_bonos = 0;
		$scope.total_factura = 0;
		
		$http.get('/api/previsiones').success(function(data) {
			$scope.plans = data.previsiones;
		}).error(function(data) {
			// log error
		});
		
		$http.get('/api/procedencias').success(function(data) {
			$scope.procedencias = data.data;
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
		
		$scope.calcular_total = function(){
			var total = 0;
			for(var i in $scope.displayed){
				if($scope.displayed[i].facturar)
					total += $scope.displayed[i].monto_pagado;
			}
			return total;
		}
		
		$scope.actualizar_total = function(){
			$scope.total_factura = $scope.calcular_total();
		};
		
		$scope.select_all = function(){
			if($scope.seleccionar_todos){
				for(var i in $scope.displayed){
					$scope.displayed[i].facturar = true;
				}
			}
			$scope.actualizar_total();
		};
		
		$scope.guardar_factura = function(datos){
			
			var facturas_ingresar = [];
			
			for(var i in datos){
				if(datos[i].facturar){
					datos[i].factura = $scope.n_factura;
					facturas_ingresar.push(datos[i]);
				}
			}
			
			if(facturas_ingresar.length == 0){
				console.log('No se seleccionaron datos');
				return ;
			}
			
			DetallesPagoFicha.all.update({
				detalles_pago_ficha : datos,
			}).
			$promise.then(function(result) {
				console.log('update detalle tipo pago');
				console.log(result);
			});
			console.log(facturas_ingresar);
			console.log('Factura asignada');
		}
	});
})();
