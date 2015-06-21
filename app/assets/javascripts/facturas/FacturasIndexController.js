(function() {
	angular.module('lab').controller('FacturasIndexController', function($scope, $auth, $state, $http, $stateParams, DetallesPagoFicha) {

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
				facturadas : 0,
				start : start,
				number : number
			}, tableState).
			$promise.then(function(result) {
				$scope.displayed = result.data;
				tableState.pagination.numberOfPages = result.numberOfPages;
				//set the number of pages so the pagination can update
				$scope.actualizar_total();
				$scope.isLoading = false;
			});
		};

		$scope.actualizar_total = function(){
			$scope.total_factura = $scope.calcular_total();
			$scope.total_fichas = $scope.calcular_total_fichas();
			$scope.total_bonos = $scope.calcular_total_bonos();
		};
		
		$scope.calcular_total_bonos = function(){
			var suma = 0;
			for(var i in $scope.displayed){
				if($scope.displayed[i].tipo_pago.nombre.toUpperCase().includes("BONO"))
					if($scope.displayed[i].facturar)
						suma++;
			}
			
			return suma;
		};
		
		$scope.count_unique = function(a){
			var temp = {};
			for (var i = 0; i < a.length; i++)
				temp[a[i]] = true;
			var r = [];
			for (var k in temp)
				r.push(k);
			return r.length;
		};
		
		$scope.calcular_total_fichas = function(){
			var fichas_temp = [];
			for(var i in $scope.displayed){
				if($scope.displayed[i].facturar)
					fichas_temp.push($scope.displayed[i].ficha_id);
			}
			return $scope.count_unique(fichas_temp);
		};
		
		$scope.select_all = function(){
			if($scope.seleccionar_todos){
				for(var i in $scope.displayed){
					$scope.displayed[i].facturar = true;
				}
			}
			$scope.actualizar_total();
		};
		
		$scope.calcular_total = function(){
			var total = 0;
			for(var i in $scope.displayed){
				if($scope.displayed[i].facturar)
					total += $scope.displayed[i].monto_pagado;
			}
			return total;
		}

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
				$state.go('loginRequired.facturas.todas');
			});
			console.log(facturas_ingresar);
			console.log('Factura asignada');
		}
	});
})();
