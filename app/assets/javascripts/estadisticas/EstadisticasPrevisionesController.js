angular.module('lab').controller('EstadisticasPrevisionesController', function($scope, $auth, $state, $http, $stateParams) {
		
	$scope.data = [300, 500, 100, 300, 46, 468];
	$scope.previsiones = [];
	
	/*Busqueda de todas las previsiones*/
	$http.get('/api/previsiones/').success(function(result) {
		for(var i in result.previsiones)
			$scope.previsiones.push(result.previsiones[i].nombre);
		
		/*Busqueda de la cantidad de pacientes por ficha*/
		$http.get('/api/previsiones/cantidades_ficha').success(function(result) {
			console.log(result.data);
			$scope.isLoading = false;
		}).error(function(result) {
			$state.go('loginRequired.index');
		});
		
	}).error(function(result) {
		$state.go('loginRequired.index');
	});
});
