angular.module('lab').controller('EstadisticasMedicosController', function($scope, $auth, $state, $http, $stateParams, $timeout) {
	$scope.isLoading = true;

	$scope.data_fichas = [];
	$scope.data_total = [];
	$scope.labels = [];
	$scope.labels_fichas = [];
	
	var datos_fichas = [];
	var datos_total = [];
	var especialidades = [];
	var label_fichas = [];
	
	/*Busqueda de la cantidad de pacientes por ficha*/
	$http.get('/api/medicos/fichas/cantidades_ficha').success(function(result) {
		//console.log(result.data);
		
		for(var i in result.data){
				datos_fichas.push(parseInt(result.data[i]));
				label_fichas.push(i);
			}
	}).error(function(result) {
		$state.go('loginRequired.index');
	});

	$http.get('/api/medicos/count/cantidades_total').success(function(result) {
		//console.log(result.data);
		
		for(var i in result.data){
				datos_total.push(parseInt(result.data[i]));
				especialidades.push(i);
			}
	}).error(function(result) {
		$state.go('loginRequired.index');
	});

	$timeout(function(){
		$scope.data_total = datos_total;
		$scope.data_fichas = datos_fichas;
		//console.log($scope.data_total);
		$scope.labels = especialidades;
		$scope.labels_fichas = label_fichas;
		$scope.isLoading = false;
	},400);	
	
});
