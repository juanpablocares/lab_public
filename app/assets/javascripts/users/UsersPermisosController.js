angular.module('lab').controller('UsersPermisosController', function($scope, $http, $stateParams, $auth, $state, Permiso) {

	$scope.isLoading = true;
	$http.get('/api/permisos').success(function(data) {
		$scope.permisos = data.data;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.guardar_permiso = function(p){
		$scope.isLoading = true;
		console.log('guardar permiso');
		console.log(p);
		if(p.id == undefined)
			p.id = 0;
		Permiso.update({
				id: p.id,
				permiso : p,
			}).
			$promise.then(function(result) {
				console.log('update permiso examenes');
				console.log(result);
				
				$http.get('/api/permisos').success(function(data) {
					$scope.permisos = data.data;
					
					for(var i in $scope.permisos)
						if($scope.permisos[i].nombre == p.nombre){
							$scope.permiso = $scope.permisos[i];
							break;
						}
					
					$scope.isLoading = false;
				}).error(function(data) {
					// log error
				});
			});
	};
	
});