angular.module('lab').controller('MedicosInstitucionesController', function($scope, $http, $stateParams, $auth, $state, Institucion, Instituciones) {

	$scope.isLoading = true;

	$http.get('/api/instituciones').success(function(data) {
		$scope.instituciones = data.data;
		for(i = 0; i < $scope.instituciones.length; i++)
			$scope.instituciones[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.instituciones[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.instituciones.push({
			codigo: '',
			nombre: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.instituciones[indice]);
		Institucion.update({id:$scope.instituciones[indice].id}, $scope.instituciones[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de institucion");
				}, function(response) {
					console.log("ERROR editando institucion");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(instituciones){
		Instituciones.all.update({
				instituciones : $scope.instituciones,
			}).
			$promise.then(function(result) {
				console.log('update instituciones');
				console.log(result);
			});
			
		$http.get('/api/instituciones').success(function(data) {
			$scope.instituciones = data.data;
			for(i = 0; i < $scope.instituciones.length; i++)
				$scope.instituciones[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		Institucion.delete({id:$scope.instituciones[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.instituciones.splice(indice, 1);
					}
					console.log("Eliminado institucion");
				}, function(response) {
					console.log("ERROR eliminando institucion");
				});
	};
});