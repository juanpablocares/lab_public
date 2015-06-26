angular.module('lab').controller('ParametrosColorOrinaController', function($scope, $http, $stateParams, $auth, $state, ValorParametro, ValoresParametros) {

	$scope.isLoading = true;

	$http.get('/api/parametros/color_orina').success(function(data) {
		$scope.array_valores = data.valores_parametros;
		console.log($scope.array_valores);
		for(i = 0; i < $scope.array_valores.length; i++){
			$scope.array_valores[i].boton_agregar = true;
		}
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.array_valores[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.array_valores.push({
			parametro_id: $stateParams.parametro_id,
			codigo: '',
			nombre: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.array_valores[indice]);
		ProcesoExamen.update({id:$scope.array_valores[indice].id}, $scope.array_valores[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(array_valores){
		console.log(array_valores);
		ValoresParametros.all.update({
				valores_parametros : array_valores,
			}).
			$promise.then(function(result) {
				console.log('update colores orina');
				$http.get('/api/parametros/color_orina').success(function(data) {
					$scope.array_valores = data.valores_parametros;
				}).error(function(data) {
					// log error
				});
				console.log(result);
			});
	};
	
	$scope.remove = function(indice){
		ValorParametro.delete({id: $scope.array_valores[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.array_valores.splice(indice, 1);
					}
					console.log("Eliminado color orina");
				}, function(response) {
					console.log("ERROR eliminando color orina");
				});
	};
});