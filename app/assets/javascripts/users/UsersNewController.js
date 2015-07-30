angular.module('lab').controller('UsersNewController', function($scope, $auth, $state, regionesService, $http) {

	$scope.user = {};
	$http.get('/api/permisos').success(function(data) {
		$scope.permisos = data.data;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	if(!regionesService.getRegiones())
	{
		$http.get('/api/regiones').success(function(data) {
	        regionesService.setRegiones(data);
	        $scope.regiones = regionesService.getRegiones();
	    }).error(function(data) {
	        console.error("Error obteniendo listado de regiones");
	        return false;
	    });
	}
	else
	{
        $scope.regiones = regionesService.getRegiones();
   	}


	$scope.guadarNuevoUsuario = function(){

		console.log($scope.user_form.$valid);
		console.log($scope.user.permiso);
		console.log($scope.user.comuna);
		if($scope.user_form.$valid)
		{
			$scope.user.rut = parseInt($scope.user.rut_completo / 10);
			$scope.user.rutdv = parseInt($scope.user.rut_completo % 10);
			$scope.user.permiso_id = $scope.user.permiso.id;
			$scope.user.comuna_id = $scope.user.comuna.id;

			$auth.submitRegistration($scope.user)
	        .then(function(resp) {
	          // handle success response
	          console.log(resp);
	        })
	        .catch(function(resp) {
	          // handle error response
	          console.error(resp);
	        });
		}
		else
		{
			console.log("invalid");
		}
	};
	$scope.volver = function(){
		$state.go('loginRequired.users.editar');
	};
});
