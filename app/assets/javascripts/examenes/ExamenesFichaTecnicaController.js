angular.module('lab').controller('ExamenesFichaTecnicaController', function($scope, $auth, $state, $http, $stateParams) {
	
	$http.get('/api/examenes/' + $stateParams.examen_id).success(function(data) {
		$scope.examen = data.examen;
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
	
	$http.get('/api/indicaciones').success(function(data) {
		$scope.indicaciones = data;
		angular.forEach(data, function(indicacion, key) {
			//console.log(indicacion);
			if (indicacion.id == $scope.examen.indicacion_id) {
				$scope.examen.indicacion = indicacion;
				//$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/indicaciones_muestra').success(function(data) {
		$scope.indicaciones_muestra = data;
		angular.forEach(data, function(indicacion_muestra, key) {
			if (indicacion_muestra.id == $scope.examen.indicacion_muestra_id) {
				$scope.examen.indicacion_muestra = indicacion_muestra;
				//$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/tapas_tubo').success(function(data) {
		$scope.tapas_tubo = data;
		angular.forEach(data, function(tapa_tubo, key) {
			if (tapa_tubo.id == $scope.examen.tapa_tubo_id) {
				$scope.examen.tapa_tubo = tapa_tubo;
				//$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/tipos_envase').success(function(data) {
		$scope.tipos_envase = data;
		angular.forEach(data, function(tipo_envase, key) {
			if (tipo_envase.id == $scope.examen.tipo_envase_id) {
				$scope.examen.tipo_envase = tipo_envase;
				//$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/tipos_muestras').success(function(data) {
		$scope.tipos_muestras = data;
		angular.forEach(data, function(tipo_muestra, key) {
			if (tipo_muestra.id == $scope.examen.tipo_muestra_id) {
				$scope.examen.tipo_muestra = tipo_muestra;
				//$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	//$scope.masterExamen = angular.copy($scope.examen);
	
	$http.get('/api/tipo_examenes').success(function(data) {
		$scope.tipo_examenes = data;
		angular.forEach(data, function(tipo_examen, key) {
			if (tipo_examen.id == $scope.examen.tipo_examen_id) {
				$scope.examen.tipo_examen = tipo_examen;
				//$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
});
