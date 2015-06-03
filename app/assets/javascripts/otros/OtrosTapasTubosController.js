angular.module('lab').controller('OtrosTapasTubosController', function($scope, $http, $stateParams, $auth, $state, TapaTubo, TapasTubos) {

	$scope.isLoading = true;

	$http.get('/api/tapas_tubo').success(function(data) {
		$scope.tapas_tubo = data;
		for(i = 0; i < $scope.tapas_tubo.length; i++)
			$scope.tapas_tubo[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.tapas_tubo[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.tapas_tubo.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.tapas_tubo[indice]);
		ProcesoExamen.update({id:$scope.tapas_tubo[indice].id}, $scope.tapas_tubo[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(tapas_tubo){
		TapasTubos.all.update({
				tapas_tubo : $scope.tapas_tubo,
			}).
			$promise.then(function(result) {
				console.log('update tipo envase');
				console.log(result);
			});
			
		$http.get('/api/tapas_tubo').success(function(data) {
			$scope.tapas_tubo = data;
			for(i = 0; i < $scope.tapas_tubo.length; i++)
				$scope.tapas_tubo[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		TapaTubo.delete({id:$scope.tapas_tubo[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.tapas_tubo.splice(indice, 1);
					}
					console.log("Eliminado tipo envase");
				}, function(response) {
					console.log("ERROR eliminando tipo envase");
				});
	};
});