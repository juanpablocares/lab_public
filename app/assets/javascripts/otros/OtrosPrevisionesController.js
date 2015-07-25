angular.module('lab').controller('OtrosPrevisionesController', function($scope, $http, $stateParams, $auth, $state, Prevision, Previsiones, previsionesService) {

	$scope.isLoading = true;
	
	$http.get('/api/tarifas').success(function(data) {
		$scope.tarifas = data;
	}).error(function(data) {
		// log error
	});
	
	$scope.setPrevisiones = function(){
		$scope.previsiones = previsionesService.getPrevisiones();
		for(i = 0; i < $scope.previsiones.length; i++){
			$scope.previsiones[i].boton_agregar = true;
			angular.forEach($scope.tarifas, function(tarifa, key) {
				if ($scope.previsiones[i].tarifa && tarifa.id == $scope.previsiones[i].tarifa.id) {
					$scope.previsiones[i].tarifa = tarifa;
				}
			});
		};
		$scope.isLoading = false;
	}

	if(!previsionesService.getPrevisiones())
	{
		Previsiones.all.get().$promise.then(function(data) {
			previsionesService.setPrevisiones(data.previsiones);
			$scope.setPrevisiones();
		}).error(function(data) {
			console.log('Error getting previsiones');
		});
	}
	else
	{
		$scope.setPrevisiones();
	}


	$http.get('/api/previsiones').success(function(data) {
		$scope.previsiones = data.previsiones;
		for(i = 0; i < $scope.previsiones.length; i++){
			$scope.previsiones[i].boton_agregar = true;
			angular.forEach($scope.tarifas, function(tarifa, key) {
				if ($scope.previsiones[i].tarifa && tarifa.id == $scope.previsiones[i].tarifa.id) {
					$scope.previsiones[i].tarifa = tarifa;
				}
			});
		};
		
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.previsiones[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.previsiones.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.previsiones[indice]);
		ProcesoExamen.update({id:$scope.previsiones[indice].id}, $scope.previsiones[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de prevision");
				}, function(response) {
					console.log("ERROR editando prevision");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(previsiones){
		
		for(i = 0; i < previsiones.length; i++){
			if(previsiones[i].tarifa)
				previsiones[i].tarifa_id = previsiones[i].tarifa.id;
			else
				previsiones[i].tarifa_id = null;
		}
		
		Previsiones.all.update({
				previsiones : $scope.previsiones,
			}).
			$promise.then(function(result) {
				console.log('update prevision');
				console.log(result);
			});
			
		$http.get('/api/previsiones').success(function(data) {
			$scope.previsiones = data.previsiones;
			for(i = 0; i < $scope.previsiones.length; i++){
				$scope.previsiones[i].boton_agregar = true;
				angular.forEach($scope.tarifas, function(tarifa, key) {
					if ($scope.previsiones[i].tarifa && tarifa.id == $scope.previsiones[i].tarifa.id) {
						$scope.previsiones[i].tarifa = tarifa;
					}
				});
			};
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		Prevision.delete({id:$scope.previsiones[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.previsiones.splice(indice, 1);
					}
					console.log("Eliminado prevision");
				}, function(response) {
					console.log("ERROR eliminando prevision");
				});
	};
});