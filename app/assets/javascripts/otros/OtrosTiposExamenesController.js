angular.module('lab').controller('OtrosTiposExamenesController', function($scope, $http, $stateParams, $auth, $state, TipoExamen, TiposExamenes) {

	$scope.isLoading = true;

	$http.get('/api/tipo_examenes').success(function(data) {
		$scope.tipo_examenes = data;
		for(i = 0; i < $scope.tipo_examenes.length; i++)
			$scope.tipo_examenes[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.tipo_examenes[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.tipo_examenes.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		console.log($scope.tipo_examenes[indice]);
		ProcesoExamen.update({id:$scope.tipo_examenes[indice].id}, $scope.tipo_examenes[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipo examenes");
				}, function(response) {
					console.log("ERROR editando tipo examenes");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(tipo_examenes){
		TiposExamenes.all.update({
				tipo_examenes : $scope.tipo_examenes,
			}).
			$promise.then(function(result) {
				console.log('update tipo examenes');
				console.log(result);
			});
			
		$http.get('/api/tipo_examenes').success(function(data) {
			$scope.tipo_examenes = data;
			for(i = 0; i < $scope.tipo_examenes.length; i++)
				$scope.tipo_examenes[i].boton_agregar = true;
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		TipoExamen.delete({id:$scope.tipo_examenes[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.tipo_examenes.splice(indice, 1);
					}
					console.log("Eliminado tipo examenes");
				}, function(response) {
					console.log("ERROR eliminando tipo examenes");
				});
	};
});