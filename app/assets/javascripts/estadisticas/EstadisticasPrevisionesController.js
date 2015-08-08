angular.module('lab').controller('EstadisticasPrevisionesController', function($scope, $auth, $state, $http, $stateParams, $timeout) {
	$scope.isLoading = true;

	$scope.labels_fichas = [];
	$scope.data_fichas = [];
	$scope.labels = [];
	$scope.labels_pacientes = [];
	
	var datos = [];
	var datos_pacientes = [];
	var previsiones = [];
	var label_previsiones = [];
	
	/*Busqueda de la cantidad de pacientes por ficha*/
	$http.get('/api/previsiones/cantidades_ficha').success(function(result) {
		//console.log(result.data);
		
		for(var i in result.data){
				datos.push(parseInt(result.data[i]));
				label_previsiones.push(i);
			}
	}).error(function(result) {
		$state.go('loginRequired.index');
	});

	$http.get('/api/previsiones/cantidades_pacientes').success(function(result) {
		console.log(result.data);
		
		for(var i in result.data){
				datos_pacientes.push(parseInt(result.data[i]));
				previsiones.push(i);
			}
		
	}).error(function(result) {
		$state.go('loginRequired.index');
	});

	$timeout(function(){
		$scope.labels_fichas = label_previsiones;
		$scope.data_fichas = datos;
		
		$scope.data_pacientes = datos_pacientes;
		$scope.labels_pacientes = previsiones;
		
		$scope.isLoading = false;
	},200);	
	
});
