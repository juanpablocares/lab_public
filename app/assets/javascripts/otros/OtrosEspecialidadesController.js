angular.module('lab').controller('OtrosEspecialidadesController', function($scope, $http, $stateParams, $auth, $state, Especialidad, Especialidades) {

	$scope.isLoading = true;

	$http.get('/api/especialidades').success(function(data) {
		$scope.especialidades = data.data;
		for(i = 0; i < $scope.especialidades.length; i++)
			$scope.especialidades[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.especialidades[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.especialidades.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.especialidades[indice]);
		ProcesoExamen.update({id:$scope.especialidades[indice].id}, $scope.especialidades[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(especialidades){
		Especialidades.all.update({
				especialidades : $scope.especialidades,
			}).
			$promise.then(function(result) {
				console.log('update tipo envase');
				console.log(result);
			});
			
		$http.get('/api/especialidades').success(function(data) {
			$scope.especialidades = data.data;
			for(i = 0; i < $scope.especialidades.length; i++)
				$scope.especialidades[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		Especialidad.delete({id:$scope.indicaciones[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.indicaciones.splice(indice, 1);
					}
					console.log("Eliminado especialidad");
				}, function(response) {
					console.log("ERROR eliminando especialidad");
				});
	};
});