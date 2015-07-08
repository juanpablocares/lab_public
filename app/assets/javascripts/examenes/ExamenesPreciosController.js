angular.module('lab').controller('ExamenesPreciosController', function($scope, $auth, $state, $http, $stateParams, TarifasExamen, TarifaExamen) {
	
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
	
	$scope.quitar_precio = function(indice, item){
		var r = confirm("Confirma limpiar?");
		if (r == true){
			item.precio = '';
			item.precio_fonasa = '';
		}
	}
	
	$scope.guardar_cambios = function(tarifas_examen){
		console.log(tarifas_examen);
		var status = true;
		for(i = 0; i < tarifas_examen.length; i++){
			TarifaExamen.update({id:tarifas_examen[i].id}, tarifas_examen[i]).
				$promise.
					then(function(response) {
						
					}, function(response) {
						status = false;
						console.log("ERROR editando tarifa examen");
					});
		}
		if(!status)
			$state.go('loginRequired.index');
	}
});
