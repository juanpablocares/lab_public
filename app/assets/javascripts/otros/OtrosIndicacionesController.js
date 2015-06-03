angular.module('lab').controller('OtrosIndicacionesController', function($scope, $http, $stateParams, $auth, $state, Indicacion, Indicaciones) {

	$scope.isLoading = true;

	$http.get('/api/indicaciones').success(function(data) {
		$scope.indicaciones = data;
		for(i = 0; i < $scope.indicaciones.length; i++)
			$scope.indicaciones[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.indicaciones[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.indicaciones.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.indicaciones[indice]);
		ProcesoExamen.update({id:$scope.indicaciones[indice].id}, $scope.indicaciones[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(indicaciones){
		Indicaciones.all.update({
				indicaciones : $scope.indicaciones,
			}).
			$promise.then(function(result) {
				console.log('update tipo envase');
				console.log(result);
			});
			
		$http.get('/api/indicaciones').success(function(data) {
			$scope.indicaciones = data;
			for(i = 0; i < $scope.indicaciones.length; i++)
				$scope.indicaciones[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		Indicacion.delete({id:$scope.indicaciones[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.indicaciones.splice(indice, 1);
					}
					console.log("Eliminado tipo envase");
				}, function(response) {
					console.log("ERROR eliminando tipo envase");
				});
	};
});