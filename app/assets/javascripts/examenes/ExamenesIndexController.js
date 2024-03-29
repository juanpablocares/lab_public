angular.module('lab').controller('ExamenesIndexController', function($scope, $auth, $state, $http, $stateParams, Examen, AliasExamenes, HoraprocesoExamenes, ModificacionExamenes) {

	$scope.historial_modificaciones = false;
	
	$scope.add = function () {
		
          $scope.alias_examen.push({
            examen_id: parseInt($stateParams.examen_id),
			nombre: '',
			descripcion: '',
          });
        };
	
	$scope.add_hora = function () {
          $scope.horaproceso_examen.push({
            examen_id: parseInt($stateParams.examen_id),
			hora: '',
			descripcion: '',
          });
        };
	
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
		examen.tipo_envase_id = examen.tipo_envase?examen.tipo_envase.id:null;
		examen.tapa_tubo_id = examen.tapa_tubo?examen.tapa_tubo.id:null;
		examen.tipo_pago = examen.tipo_pago?examen.tipo_pago.codigo:null;
		examen.interno = examen.interno?examen.interno.codigo:null;
		examen.procesador_examen_id = examen.procesador_examen?examen.procesador_examen.id:null;
		examen.proceso_examen_id = examen.proceso_examen?examen.proceso_examen.id:null;
		
		console.log(examen);

		if(examen.indicacion_muestra)
			examen.indicacion_muestra_id = examen.indicacion_muestra.id;
		else
			examen.indicacion_muestra_id = null;
		
		if(examen.tipo_muestra)
			examen.tipo_muestra_id = examen.tipo_muestra.id;
		else
			examen.tipo_muestra_id = null;
		
		if(examen.tipo_examen)
			examen.tipo_examen_id = examen.tipo_examen.id;
		else
			examen.tipo_examen_id = null;
		
		if(examen.indicacion)
			examen.indicacion_id = examen.indicacion.id;
		else
			examen.indicacion_id = null;
		
		HoraprocesoExamenes.all.update({
				horaproceso_examen : $scope.horaproceso_examen,
			}).
			$promise.then(function(result) {
				console.log('update horaproceso examenes');
				console.log(result);
			});
		
		AliasExamenes.all.update({
				alias_examen : $scope.alias_examen,
			}).
			$promise.then(function(result) {
				console.log('update alias examenes');
				console.log(result);
			});
		
		Examen.update({id:examen.id}, examen).
		$promise.then(function(response) {
			$scope.masterExamen = angular.copy($scope.examen);
			$scope.$emit('examenFromEdit',$scope.examen);
			$scope.examennEditing = !$scope.examenEditing;
		}, function(response) {
			$scope.resetExamen();
			console.log("ERROR editando examen");
		});
		
		ModificacionExamenes.root.nuevo({
			examen_id : $stateParams.examen_id,
			user_id   : $auth.user.id
		}).$promise.then(function(response) {
			console.log('Modificacion examen creado');
			$http.get('/api/modificacion_examenes/examen/' + $stateParams.examen_id).success(function(data) {
				$scope.modificacion_examen = data.modificaciones;
				//console.log($scope.modificacion_examen);
			}).error(function(data) {
				// log error
			});
		}, function(response) {
			console.log("ERROR creando modificacion examen");
		});
	};
	
	$scope.mostrar_historial = function(){
		$scope.historial_modificaciones = !$scope.historial_modificaciones;
	};

	$scope.$on('examenFromMenu', function(event, data) {
		$scope.alias_examen = data.alias_examenes;
		$scope.horaproceso_examen = data.horaproceso_examenes;
		$scope.examen = data;
		angular.forEach($scope.procesadores, function(procesador, key) {
			if(procesador.label == $scope.examen.procedencia){
				$scope.examen.procesa = procesador;
				$scope.masterExamen = angular.copy($scope.examen);
			}
		});

		angular.forEach($scope.tipos_pago, function(tipo_pago, key) {
			if(tipo_pago.codigo == $scope.examen.tipo_pago){
				$scope.examen.tipo_pago = tipo_pago;
				$scope.masterExamen = angular.copy($scope.examen);
			}
		});

		angular.forEach($scope.codigos_interno, function(inter, key) {
			if(inter.codigo == $scope.examen.interno){
				$scope.examen.interno = inter;
				$scope.masterExamen = angular.copy($scope.examen);
			}
		});

		console.log(data);
		$scope.masterExamen = angular.copy($scope.examen);
		
	});

	$http.get('/api/proceso_examenes').success(function(data) {
		$scope.proceso_examenes = data;
		angular.forEach(data, function(proceso_examen, key) {
			//console.log(indicacion);
			if (proceso_examen.id == $scope.examen.proceso_examen_id) {
				$scope.examen.proceso_examen = proceso_examen;
				$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/procesadores_examenes').success(function(data) {
		$scope.procesadores_examenes = data;
		angular.forEach(data, function(procesador_examen, key) {
			//console.log(indicacion);
			if (procesador_examen.id == $scope.examen.procesador_examen_id) {
				$scope.examen.procesador_examen = procesador_examen;
				$scope.masterExamen = angular.copy($scope.examen);
			}
		});
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/indicaciones').success(function(data) {
		$scope.indicaciones = data;
		angular.forEach(data, function(indicacion, key) {
			//console.log(indicacion);
			if (indicacion.id == $scope.examen.indicacion_id) {
				$scope.examen.indicacion = indicacion;
				$scope.masterExamen = angular.copy($scope.examen);
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
				$scope.masterExamen = angular.copy($scope.examen);
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
				$scope.masterExamen = angular.copy($scope.examen);
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

	$scope.tipos_pago = [{'codigo': 'P', 'nombre': 'Particular'},
						 {'codigo': 'F', 'nombre': 'Fonasa e Isapres'},
						 {'codigo': 'SC', 'nombre': 'Sin Costo'},
						 {'codigo': 'NO', 'nombre': 'No se hace'}];

	$scope.codigos_interno = [{'codigo': 'CF', 'nombre': 'CF'},
				      {'codigo': '500', 'nombre': '500'},
				      {'codigo': 'FV2', 'nombre': 'FV2'}];
	
	$http.get('/api/modificacion_examenes/examen/' + $stateParams.examen_id).success(function(data) {
		$scope.modificacion_examen = data.modificaciones;
		//console.log($scope.modificacion_examen);
	}).error(function(data) {
		// log error
	});
});
