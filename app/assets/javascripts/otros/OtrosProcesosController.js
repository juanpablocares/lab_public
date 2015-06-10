angular.module('lab').controller('OtrosProcesosController', function($scope, $http, $stateParams, $auth, $state, ProcesoExamen, ProcesosExamenes) {

	$scope.isLoading = true;

	$http.get('/api/proceso_examenes').success(function(data) {
		$scope.proceso_examenes = data;
		for(i = 0; i < $scope.proceso_examenes.length; i++)
			$scope.proceso_examenes[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.proceso_examenes[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.proceso_examenes.push({
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
	
	$scope.guardar_cambios = function(proceso_examenes){
		ProcesosExamenes.all.update({
				proceso_examenes : $scope.proceso_examenes,
			}).
			$promise.then(function(result) {
				console.log('update procesos examenes');
				console.log(result);
			});
			
		$http.get('/api/proceso_examenes').success(function(data) {
			$scope.proceso_examenes = data;
			for(i = 0; i < $scope.proceso_examenes.length; i++)
				$scope.proceso_examenes[i].boton_agregar = true;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		ProcesoExamen.delete({id:$scope.proceso_examenes[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.proceso_examenes.splice(indice, 1);
					}
					console.log("Eliminado proceso Examen");
				}, function(response) {
					console.log("ERROR eliminando proceso examen");
				});
	};
});