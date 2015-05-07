angular.module('lab').controller('fichaTemporalController', function($scope, $auth, $state, $http, $stateParams)
{
	$scope.loading = true;
	$scope.precio_total = 0;
	$scope.ficha = {};
	
	$scope.ficha = $stateParams.ficha;
	$scope.paciente = $stateParams.paciente;
	$scope.examenesSeleccionados = $scope.ficha.examenesSeleccionados;
	console.log($scope.examenesSeleccionados);
	
	$scope.ficha.creado = Date();
	$scope.ficha.user = $auth.user;
	
	total = 0;
	for (var i = 0; i < $scope.examenesSeleccionados.length; i++) {
		if($scope.examenesSeleccionados[i].tarifas_examen[0])
		{
			console.log($scope.examenesSeleccionados[i]);
			$scope.examenesSeleccionados[i].precio = $scope.examenesSeleccionados[i].tarifas_examen[0].precio;
			total = total + $scope.examenesSeleccionados[i].tarifas_examen[0].precio;
		}
	}
	
	$scope.precio_total = total;
	console.log($scope.precio_total);
	
	$scope.loading = false;
});
