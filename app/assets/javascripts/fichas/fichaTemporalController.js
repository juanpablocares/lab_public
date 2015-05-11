angular.module('lab').controller('fichaTemporalController', function($scope, $auth, $state, $http, $stateParams)
{
	$scope.loading = true;
	$scope.precio_total = 0;
	$scope.ficha = {};
	$scope.examenesArray = [];
	$scope.examenesSeleccionados = [];
	
	$scope.crearExamenesArray = function() {
		$scope.examenesArray = [];
		angular.forEach($scope.perfiles, function(value, key) {
			value.perfil = true;
			$scope.examenesArray.push(value);
		});
		angular.forEach($scope.examenes, function(value, key) {
			value.perfil = false;
			$scope.examenesArray.push(value);
		});
	};
	
	$scope.ficha = $stateParams.ficha;
	$scope.paciente = $stateParams.paciente;
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
	
	$scope.loading = false;
});
