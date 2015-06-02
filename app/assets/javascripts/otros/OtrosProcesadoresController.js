angular.module('lab').controller('OtrosProcesadoresController', function($scope, $http, $stateParams, $auth, $state, ProcesadorExamen, ProcesadoresExamenes) {

	$scope.isLoading = true;

	$http.get('/api/procesadores_examenes').success(function(data) {
		$scope.procesadores_examenes = data;
		for(i = 0; i < $scope.procesadores_examenes.length; i++)
			$scope.procesadores_examenes[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.procesadores_examenes[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.procesadores_examenes.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.proceso_examenes[indice]);
		ProcesoExamen.update({id:$scope.proceso_examenes[indice].id}, $scope.proceso_examenes[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de Tarifa Examen");
				}, function(response) {
					console.log("ERROR editando tarifa");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(procesadores_examenes){
		ProcesadoresExamenes.all.update({
				procesadores_examenes : $scope.procesadores_examenes,
			}).
			$promise.then(function(result) {
				console.log('update procesadores examenes');
				console.log(result);
			});
	};
	
	$scope.remove = function(indice){
		
		ProcesadorExamen.delete({id:$scope.procesadores_examenes[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.procesadores_examenes.splice(indice, 1);
					}
					console.log("Eliminado procesador Examen");
				}, function(response) {
					console.log("ERROR eliminando procesador examen");
				});
	};
});