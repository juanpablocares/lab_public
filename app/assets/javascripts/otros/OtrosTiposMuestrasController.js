angular.module('lab').controller('OtrosTiposMuestrasController', function($scope, $http, $stateParams, $auth, $state, TipoMuestra, TiposMuestras) {

	$scope.isLoading = true;

	$http.get('/api/tipos_muestras').success(function(data) {
		$scope.tipos_muestras = data;
		for(i = 0; i < $scope.tipos_muestras.length; i++)
			$scope.tipos_muestras[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.tipos_muestras[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.tipos_muestras.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		ProcesoExamen.update({id:$scope.tipos_muestras[indice].id}, $scope.tipos_muestras[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de Tarifa Examen");
				}, function(response) {
					console.log("ERROR editando tarifa");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(tipos_muestras){
		TiposMuestras.all.update({
				tipos_muestras : $scope.tipos_muestras,
			}).
			$promise.then(function(result) {
				console.log('update TiposMuestras');
				console.log(result);
			});
			
		$http.get('/api/tipos_muestras').success(function(data) {
			$scope.tipos_muestras = data;
			for(i = 0; i < $scope.tipos_muestras.length; i++)
				$scope.tipos_muestras[i].boton_agregar = true;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		TipoMuestra.delete({id:$scope.tipos_muestras[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.tipos_muestras.splice(indice, 1);
					}
					console.log("Eliminado TipoMuestra");
				}, function(response) {
					console.log("ERROR eliminando TipoMuestra");
				});
	};
});