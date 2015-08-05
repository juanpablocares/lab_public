angular.module('lab').controller('EstadisticasPrevisionesController', function($scope, $auth, $state, $http, $stateParams, $timeout) {
	$scope.isLoading = true;
	//$scope.data = [7, 0, 0, 8, 0, 0];
	//$scope.labels = ["Banmedica", "Vida Tres", "Consalud", "Cruz Blanca", "Colmena", "Fonasa"];
	$scope.data = [];
	$scope.labels = [];
	var datos = [];
	var datos_pacientes = [];
	var previsiones = [];
	//$scope.showChart = false;

	$scope.labels_pacientes = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	$scope.data_pacientes = [300, 500, 100];
	$scope.showChart_pacientes = true;
	/*Busqueda de todas las previsiones*/
	$http.get('/api/previsiones/').success(function(result) {
		
		for(var i in result.previsiones){
			previsiones.push(result.previsiones[i].nombre);
			datos.push(0);
			datos_pacientes.push(0);
		}
		/*Busqueda de la cantidad de pacientes por ficha*/
		$http.get('/api/previsiones/cantidades_ficha').success(function(result) {
			//console.log(result.data);
			
			for(var i in result.data)
				for(var j in previsiones)
					if(previsiones[j] == i){
						datos[j] = parseInt(result.data[i]);
						break;
					}	
		}).error(function(result) {
			$state.go('loginRequired.index');
		});

		$http.get('/api/previsiones/cantidades_pacientes').success(function(result) {
			console.log(result.data);
			
			for(var i in result.data)
				for(var j in previsiones)
					if(previsiones[j] == i){
						datos_pacientes[j] = parseInt(result.data[i]);
						break;
					}	
		}).error(function(result) {
			$state.go('loginRequired.index');
		});

	}).error(function(result) {
		$state.go('loginRequired.index');
	});

	$timeout(function(){
		$scope.data = datos;
		$scope.data_pacientes = datos_pacientes;
		console.log($scope.data_pacientes);
		$scope.labels = previsiones;
		$scope.isLoading = false;
	},200);	
	
});
