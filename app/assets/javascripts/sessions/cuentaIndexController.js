angular.module('lab').controller('CuentaIndexController', ['$scope', '$auth', '$state', '$http',
function($scope, $auth, $state, $http) {
	$scope.user.editing = true;
	$scope.userModel = angular.copy($auth.user);
	$scope.userModel.rutCompleto = $scope.userModel.rut+""+$scope.userModel.rutdv;
	
	$scope.rutToTexto = function(mod)
	{
		var rutTexto = mod.rutdv+"-";
		var s = "";
		var temp = mod.rut.toString();
		for(var i = temp.length - 1, j = 0; i >= 0; i--, j++)
		{
			if(j%3==0 && j != 0)s = s+".";
			s = s+""+temp[i];
		}
		s = rutTexto+s;
		for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
 	 	return o;
	}
	
	$scope.cambiarVentanaSinCambios = function(){
		$scope.user.editing = !$scope.user.editing;
		$scope.userModel = angular.copy($auth.user);
		$scope.userModel.rutCompleto = $scope.userModel.rut+""+$scope.userModel.rutdv;
	};
	
	$scope.guardarDatosPersonales = function(mod)
	{
		console.log("guardar");
	};
}]);
