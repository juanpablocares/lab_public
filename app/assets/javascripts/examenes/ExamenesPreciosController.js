angular.module('lab').controller('ExamenesPreciosController', function($scope, $auth, $state, $http, $stateParams, TarifasExamen) {
	
	$scope.isLoading = true;
	
	TarifasExamen.by_examen.get({
		id : $stateParams.examen_id
	}).$promise.then(function(result) {
		$scope.tarifas_examen = result.tarifa_examen;
		console.log($scope.tarifas_examen);
	}).catch(function(response) {
		console.error("Error al cargar tarifas examen");
	});
	
	$scope.isLoading = false;
});
