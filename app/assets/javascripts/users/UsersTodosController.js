angular.module('lab').controller('UsersTodosController', function($scope, $http, $stateParams, $auth, $state, Users, TiposPagos) {

	$scope.isLoading = true;
	$http.get('/api/users').success(function(data) {
		$scope.users = data;
		$http.get('/api/permisos').success(function(data) {
			$scope.permisos = data.data;
			for(var i in $scope.users)
				for(var j in $scope.permisos)
					if($scope.permisos[j].id == $scope.users[i].permiso_id){
						$scope.users[i].permiso = $scope.permisos[j];
						break;
					}
					
			$scope.isLoading = false;
		}).error(function(data) {
			// log error
		});
	}).error(function(data) {
		// log error
	});
	
	$scope.guardar_cambios = function(){
		$scope.isLoading = true;
		for(var i in $scope.users)
			if($scope.users[i].permiso != undefined)
				$scope.users[i].permiso_id = $scope.users[i].permiso.id;

		Users.all.update({
				users : $scope.users,
			}).
			$promise.then(function(result) {
				$http.get('/api/users').success(function(data) {
					$scope.users = data;
					for(var i in $scope.users)
						for(var j in $scope.permisos)
							if($scope.permisos[j].id == $scope.users[i].permiso_id){
								$scope.users[i].permiso = $scope.permisos[j];
								break;
							}
					$scope.isLoading = false;
					console.log('update usuarios');
					console.log(result);
				}).error(function(data) {
					// log error
				});
			});
	};
	
	$scope.remove = function(indice){
		console.log(indice);
		/*TipoPago.delete({id:$scope.tipos_pago[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.tipos_pago.splice(indice, 1);
					}
					console.log("Eliminado tipos_pago");
				}, function(response) {
					console.log("ERROR eliminando tipos_pago");
				});*/
	};
});