angular.module('lab').controller('MedicosEspecialidadesController', function($scope, $http, $stateParams, $auth, $state, Especialidad, Especialidades) {

	$scope.isLoading = true;

	$http.get('/api/especialidades').success(function(data) {
		$scope.especialidades = data.especialidades;
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
			codigo: '',
			nombre: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.especialidades[indice]);
		Institucion.update({id:$scope.especialidades[indice].id}, $scope.especialidades[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de especialidad");
				}, function(response) {
					console.log("ERROR editando especialidad");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(especialidades){
		Especialidades.all.update({
				especialidades : $scope.especialidades,
			}).
			$promise.then(function(result) {
				console.log('update especialidades');
				console.log(result);
			});
			
		$http.get('/api/especialidades').success(function(data) {
			$scope.especialidades = data.especialidades;
			for(i = 0; i < $scope.especialidades.length; i++)
				$scope.especialidades[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		Institucion.delete({id:$scope.especialidades[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.especialidades.splice(indice, 1);
					}
					console.log("Eliminado institucion");
				}, function(response) {
					console.log("ERROR eliminando institucion");
				});
	};
});