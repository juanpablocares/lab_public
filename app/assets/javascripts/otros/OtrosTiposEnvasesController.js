angular.module('lab').controller('OtrosTiposEnvasesController', function($scope, $http, $stateParams, $auth, $state, TipoEnvase, TiposEnvases) {

	$scope.isLoading = true;

	$http.get('/api/tipos_envase').success(function(data) {
		$scope.tipos_envases = data;
		for(i = 0; i < $scope.tipos_envases.length; i++)
			$scope.tipos_envases[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.tipos_envases[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.tipos_envases.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.tipos_envases[indice]);
		ProcesoExamen.update({id:$scope.tipos_envases[indice].id}, $scope.tipos_envases[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(tipos_envases){
		TiposEnvases.all.update({
				tipos_envases : $scope.tipos_envases,
			}).
			$promise.then(function(result) {
				console.log('update tipo envase');
				console.log(result);
			});
			
		$http.get('/api/tipos_envase').success(function(data) {
			$scope.tipos_envases = data;
			for(i = 0; i < $scope.tipos_envases.length; i++)
				$scope.tipos_envases[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		TipoEnvase.delete({id:$scope.tipos_envases[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.tipos_envases.splice(indice, 1);
					}
					console.log("Eliminado tipo envase");
				}, function(response) {
					console.log("ERROR eliminando tipo envase");
				});
	};
});