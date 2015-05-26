angular.module('lab').controller('ExamenesIndexController', function($scope, $auth, $state, $http, $stateParams, Examen) {

	$scope.alias_items = [{
		texto: '',
	}];

	$scope.horas_proceso = [{
		texto: '',
	}];
	
	$scope.procesadores = [{
	  id: 1,
	  label: 'N',
	}, {
	  id: 2,
	  label: 'BK',
	}, {
	  id: 3,
	  label: 'LG',
	}];
	
	$scope.tipo_muestras = [{
	  id: 1,
	  label: 'Ematologico',
	}, {
	  id: 2,
	  label: 'Inmunologico',
	}];
	
	$scope.procesos = [{
	  id: 1,
	  label: 'Interno',
	}, {
	  id: 2,
	  label: 'Derivado',
	}, {
	  id: 3,
	  label: 'No se realiza',
	}];
	
	$scope.tapas = [{
	  id: 1,
	  label: 'Azul',
	}, {
	  id: 2,
	  label: 'Rojo',
	}, {
	  id: 3,
	  label: 'Blanco',
	}];
	
	$scope.envases = [{
	  id: 1,
	  label: 'Propileno',
	}, {
	  id: 2,
	  label: 'Vidrio',
	}];
	
	$scope.add = function () {
          $scope.alias_items.push({ 
            question: "",
          });
        };
	
	$scope.add_hora = function () {
          $scope.horas_proceso.push({ 
            question: "",
          });
        };
	
	$scope.$on('examenFromMenu', function(event, data) {
		console.log(data);
		$scope.examen = data;
		angular.forEach($scope.procesadores, function(procesador, key) {
			if(procesador.label == $scope.examen.procedencia){
				$scope.examen.procesa = procesador;
				$scope.masterExamen = angular.copy($scope.examen);
			}
		});
		
		$scope.masterExamen = angular.copy($scope.examen);
		
		$http.get('/api/indicaciones').success(function(data) {
			$scope.indicaciones = data;
			angular.forEach(data, function(indicacion, key) {
				if (indicacion.id == $scope.examen.indicacion_id) {
					$scope.examen.indicacion = indicacion;
					$scope.masterExamen = angular.copy($scope.examen);
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
					$scope.masterExamen = angular.copy($scope.examen);
				}
			});
		}).error(function(data) {
			// log error
		});
		
		$scope.masterExamen = angular.copy($scope.examen);
		
		$http.get('/api/tipo_examenes').success(function(data) {
			$scope.tipo_examenes = data;
			angular.forEach(data, function(tipo_examen, key) {
				if (tipo_examen.id == $scope.examen.tipo_examen_id) {
					$scope.examen.tipo_examen = tipo_examen;
					$scope.masterExamen = angular.copy($scope.examen);
				}
			});
		}).error(function(data) {
			// log error
		});
	});

	$scope.examenEditing = false;
	
	if ($stateParams.examen != null) {
		$scope.examen = $stateParams.examen;
		$scope.masterExamen = angular.copy($scope.examen);
	}
	
	$scope.resetExamen = function() {
		$scope.examenEditingForm.$setPristine();
		$scope.examen = angular.copy($scope.masterExamen);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.examenEditing = !$scope.examenEditing;
		$scope.resetExamen();
	};

	$scope.updateExamen = function() { 
		$scope.masterExamen = angular.copy($scope.examen);
		$scope.$emit('examenFromEdit',$scope.examen);
	};

	$scope.guardarDatosExamen = function(examen) {
		//examen.procedencia = examen.procesa.label;
		//examen.indicacion_id = examen.indicacion.id;
		examen.tipo_examen_id = examen.tipo_examen.id;
		console.log(examen);
		Examen.update({id:examen.id}, examen).
			$promise.
				then(function(response) {
					$scope.masterExamen = angular.copy($scope.examen);
					$scope.$emit('examenFromEdit',$scope.examen);
					$scope.examenEditing = !$scope.examenEditing;
				}, function(response) {
					$scope.resetExamen();
					console.log("ERROR editando examen");
				});
	};
});
