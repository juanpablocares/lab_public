angular.module('lab').controller('UsersNewController', function($scope, $auth, $state, regionesService, $http) {

	$scope.user = {};
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


	$scope.guadarNuevoUsuario = function(medico){
			
	};
	$scope.volver = function(){
		$state.go('loginRequired.users.editar');
	};
});
