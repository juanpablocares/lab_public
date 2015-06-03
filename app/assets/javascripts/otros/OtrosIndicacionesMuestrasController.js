angular.module('lab').controller('OtrosIndicacionesMuestrasController', function($scope, $http, $stateParams, $auth, $state, IndicacionMuestra, IndicacionesMuestras) {

	$scope.isLoading = true;

	$http.get('/api/indicaciones_muestra').success(function(data) {
		$scope.indicaciones_muestra = data;
		for(i = 0; i < $scope.indicaciones_muestra.length; i++)
			$scope.indicaciones_muestra[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.indicaciones_muestra[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.indicaciones_muestra.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.indicaciones_muestra[indice]);
		ProcesoExamen.update({id:$scope.indicaciones_muestra[indice].id}, $scope.indicaciones_muestra[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(indicaciones_muestra){
		IndicacionesMuestras.all.update({
				indicaciones_muestra : $scope.indicaciones_muestra,
			}).
			$promise.then(function(result) {
				console.log('update indicaciones muestras');
				console.log(result);
			});
			
		$http.get('/api/indicaciones_muestra').success(function(data) {
			$scope.indicaciones_muestra = data;
			for(i = 0; i < $scope.indicaciones_muestra.length; i++)
				$scope.indicaciones_muestra[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		IndicacionMuestra.delete({id:$scope.indicaciones_muestra[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.indicaciones_muestra.splice(indice, 1);
					}
					console.log("Eliminado indicaciones muestras");
				}, function(response) {
					console.log("ERROR eliminando indicaciones muestras");
				});
	};
});