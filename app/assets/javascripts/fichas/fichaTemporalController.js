angular.module('lab').controller('fichaTemporalController', function($scope, $auth, $state, $http, $stateParams, Medicos, Procedencias, Examenes, Perfiles)
{
	$scope.loading = true;
	$scope.precio_total = 0;
	$scope.ficha = {};
	$scope.examenesArray = [];
	$scope.examenesSeleccionados = [];
	
	$scope.iniciar_vista = function(){
		
		Medicos.buscar.todos().$promise.then(function(response) {
				$scope.medicosArray = response.data;
			}, function(response) {
				console.log("ERROR obteniendo medicos");
			});

			
			Procedencias.buscar.todos().$promise.then(function(response) {
				$scope.procedenciasArray = response.data;
			}, function(response) {
				console.log("ERROR obteniendo procedencias");
			});

			Examenes.all.index({
			}).$promise.then(function(response) {
				$scope.examenes = response.data;
				$scope.crearExamenesArray();
			}, function(response) {
				console.log("ERROR obteniendo examenes");
			});

			Perfiles.buscar.todos().$promise.then(function(response) {
				$scope.perfiles = response.data;
				$scope.crearExamenesArray();
			}, function(response) {
				console.log("ERROR obteniendo perfiles");
			});
	};
	
	$scope.iniciar_vista();
	
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
