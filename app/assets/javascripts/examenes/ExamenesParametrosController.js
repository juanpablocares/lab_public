angular.module('lab').controller('ExamenesParametrosController', function($scope, $http, $stateParams, $auth, $state, ValorParametro, ValoresParametros) {

	$scope.isLoading = true;
	$scope.array_parametros = [];
	$http.get('/api/parametros/').success(function(data) {
		$scope.parametros = data;
		console.log($scope.parametros);
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.array_parametros[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.array_parametros.push({
			examen_id: $stateParams.examen_id,
			unidad: '',
			nombre_visible: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.array_parametros[indice]);
		ProcesoExamen.update({id:$scope.array_parametros[indice].id}, $scope.array_parametros[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(array_parametros){
		console.log(array_parametros);
		ValoresParametros.all.update({
				valores_parametros : array_parametros,
			}).
			$promise.then(function(result) {
				console.log('update colores orina');
				$http.get('/api/parametros/color_orina').success(function(data) {
					$scope.array_parametros = data.valores_parametros;
				}).error(function(data) {
					// log error
				});
				console.log(result);
			});
	};
	
	$scope.remove = function(indice){
		ValorParametro.delete({id: $scope.array_parametros[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.array_parametros.splice(indice, 1);
					}
					console.log("Eliminado color orina");
				}, function(response) {
					console.log("ERROR eliminando color orina");
				});
	};
});