/**
 * Controlador encargado de la creación de fichas clinicas y cotizaciones.
 */

/*
 Ejemplo de formato de Model "listado"

 Cada vez que en la vista se agreguen examenes, se agregarán de ésta forma al model "listado"
 y luego listado es lo que se enviará a la api, ademas de los datos del paciente

 */

angular.module('lab').controller('FichasNewController', function($scope, $auth, $state, $http, $resource, $stateParams, Previsiones, Examenes, Perfiles, Cotizaciones, Cotizacion, Procedencias, Ficha, Fichas, Medicos) {

	$scope.edit = true;
	$scope.ficha = {};
	$scope.selectModel = {};
	$scope.procedencia = {};
	$scope.medico = {};
	$scope.observaciones = "";
	$scope.examenes = {};
	$scope.perfiles = {};
	$scope.paciente = {};
	$scope.prevision = {};
	$scope.precio_total_edit = 0;
	$scope.medicosArray = []; 
	$scope.procedenciasArray = [];
	$scope.previsionesArray = [];
	$scope.examenesArray = [];
	$scope.examenesSeleccionados_edit = [];
	$scope.editExamenes = true;
	$scope.examenesAgregados = [];

	$http.get('/api/pacientes/' + $stateParams.paciente_id).success(function(data) {
		//Set of received data to parent paciente object.
		$scope.paciente = data.data;
		//Functions of paciente object
		$scope.paciente.getNombreCompleto = function() {
			return this.nombre + " " + this.apellido_paterno + " " + this.apellido_materno;
		};
		$scope.paciente.getRutCompleto = function() {
			return this.rut + "" + this.rutdv;
		};
		$scope.prevision = $scope.paciente.prevision;
		$scope.paciente.fecha_nacimiento = new Date($scope.paciente.fecha_nacimiento);
		$scope.paciente.getEdad = function() {
            $scope.paciente.fecha_nacimiento = new Date($scope.paciente.fecha_nacimiento);
            if ($scope.paciente != null) {
                var d = new Date();
                var meses = 0;
                if ($scope.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth() > 0)
                        meses += 12 - $scope.paciente.fecha_nacimiento.getUTCMonth() + d.getMonth();
                else
                        meses = Math.abs($scope.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth());
                var birthday = +new Date($scope.paciente.fecha_nacimiento);
                var anios = ((Date.now() - birthday) / (31556926000));
                return ~~anios + " Años " + ~~meses + " meses";
            }
        };
		$scope.paciente.edad = $scope.paciente.getEdad();
		$scope.paciente.rut_completo = $scope.paciente.getRutCompleto();
		$scope.paciente.nombre_completo = $scope.paciente.getNombreCompleto();

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


		Previsiones.all.get().$promise.then(function(response) {
			$scope.previsionesArray = response.previsiones;
			$scope.prevision.selected = $scope.setPrevisionSeleccionada($scope.paciente.prevision);
		}, function(response) {
			console.log("ERROR obteniendo previsiones");
		});

		Perfiles.buscar.todos().$promise.then(function(response) {
			$scope.perfiles = response.data;
			$scope.crearExamenesArray();
		}, function(response) {
			console.log("ERROR obteniendo perfiles");
		});

	}).error(function(data) {
		$state.go('loginRequired.index');
	});

	$scope.setPrevisionSeleccionada = function(prevision) {
		for (var i = 0; i < $scope.previsionesArray.length; i++) {
			var value = $scope.previsionesArray[i];
			if (value.id == prevision.id) {
				return value;
			}
		};
	};

	$scope.crearExamenesArray = function() {
		$scope.examenesArray = [];
		angular.forEach($scope.perfiles, function(value, key) {
			value.perfil = true;
			for (var i = 0; i < value.examenes.length; i++)
			{
				var aux = value.examenes[i];
				var temp = null;
				for (var j = 0; j < aux.tarifas_examen.length; j++) {
					var value2 = aux.tarifas_examen[j];
					if (value2 != null && value2.tarifa_id == $scope.paciente.prevision.tarifa_id) {
						aux.tarifa_prevision = value2;
						break;
					}
				}
			}
			$scope.examenesArray.push(value);
		});

		angular.forEach($scope.examenes, function(value, key) {
			value.perfil = false;
			for (var i = 0; i < value.tarifas_examen.length; i++) {
				var tarifa = value.tarifas_examen[i]; 
				if (tarifa.tarifa_id == $scope.paciente.prevision.tarifa_id) {
					value.tarifa_prevision = tarifa;
					break;
				}
			}
			$scope.examenesArray.push(value);
		});
	};

	$scope.quitarExamenSeleccionado = function(item) {
		var index = $scope.examenesSeleccionados_edit.indexOf(item);
		$scope.examenesSeleccionados_edit.splice(index, 1);
		var index2 = null;
		if (item.perfil) {
			index2 = $scope.examenesAgregados.indexOf(item);
		}
		else {
			index2 = $scope.examenesAgregados.indexOf(item.examen);
		}
		if (index2 != -1) {
			$scope.examenesAgregados.splice(index2, 1);
		}
		$scope.getPrecioTotal();
	};

	$scope.agruparPerfiles = function(item) {
		if (item.perfil)
			return 'Perfiles';
		else
			return 'Exámenes';
	};

	$scope.seleccionarExamen = function(model2, select) {
		var model = angular.copy(model2);
		select.selected = "";
		//model.nuevo = true;
		var perfil = model.perfil;
		if (!perfil) {
			model = {
				nuevo : true,
				examen : angular.copy(model2)
			};
		}
		else {
			for (var i = 0; i < model.examenes.length; i++) {
				model.examenes[i].nuevo = true;
			};
		}
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var value = $scope.examenesSeleccionados_edit[i];
			if (perfil && value.perfil) {
				if (model.id == value.id) {
					alert("Perfil ya agregado");
					return;
				}
			}
			else
			if (!perfil && !value.perfil) {
				if (model.examen.id == value.examen.id) {
					alert("Examen ya agregado");
					return;
				}
			}
		};
		if (perfil) {
			$scope.examenesAgregados.push(model);
		}
		else {
			$scope.examenesAgregados.push(model.examen);
		}
		model.delete = true;
		$scope.examenesSeleccionados_edit.push(model);
		$scope.getPrecioTotal();
	};

	$scope.seleccionarPrevision = function(prevision, select)
	{
		//Se cambia la prevision. Debe cambiar en el registro del paciente, de la ficha
		//y actualizar los precios de los examenes realizados a la tarifa de la nueva prevision.
		$scope.paciente.prevision = prevision;
		$scope.crearExamenesArray();
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	}

	$scope.limpiarTarifas = function() {
		console.log("limpiarTarifas");
		console.log($scope.examenesSeleccionados_edit);
		//De examenes ya seleccionados al cargar ficha
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var temp1 = $scope.examenesSeleccionados_edit[i];
			if (!temp1.perfil)
			{
				var temp3 = temp1.examen;
				var temp = null;
				for (var j = 0; j < temp3.tarifas_examen.length; j++) {
					var value = temp3.tarifas_examen[j];
					if (value.tarifa_id == $scope.paciente.prevision.tarifa_id) {
						temp3.tarifa_prevision = angular.copy(value);
						temp1.precio = value.precio;
						break;
					}
					else
					{
						temp3.tarifa_prevision = null;
						temp1.precio = 0;
					}
				}
			}
			else
			{
				for (var i = 0; i < temp1.examenes.length; i++)
				{
					var detalle = temp1.examenes[i];
					var temp = null;
					var value = detalle.examen;
					for (var j = 0; j < value.tarifas_examen.length; j++) {
						var value2 = value.tarifas_examen[j];
						if (value2.tarifa_id == $scope.paciente.prevision.tarifa_id)
						{
							value.tarifa_prevision = angular.copy(value2);
							value.precio = value2.precio;
							break;
						}
						else
						{
							value.tarifa_prevision = null;
							valueo.precio = 0;
						}
					}
				}
			}
		}
		console.log("END limpiarTarifas");
	}

	$scope.validate_form = function(ficha_form)
	{
		return $scope.examenesSeleccionados_edit.length > 0 && ficha_form.$valid;
	}

	$scope.crearFicha = function(ficha_form) {
		if ($scope.validate_form(ficha_form)) {
			$scope.ficha.paciente_id = $scope.paciente.id;
			if ($scope.medico != undefined && $scope.medico.selected != undefined) {
				$scope.ficha.medico_id = $scope.medico.selected.id;
			}
			else {
				$scope.ficha.medico_id = null;
			}
			$scope.ficha.precio_total = $scope.precio_total_edit;
			$scope.ficha.procedencia_id = $scope.procedencia.selected.id;
			$scope.ficha.examenesAgregados = $scope.examenesAgregados;
			$scope.ficha.prevision_id = $scope.prevision.selected.id;
			$scope.ficha.detalles_ficha = null;
			console.log("Antes de update");
			Ficha.new($scope.ficha).$promise.then(function(response) {
				$state.go('loginRequired.fichas.info', {
					ficha_id : response.data.id
				});
			}, function(response) {
				console.log("ERROR creando ficha");
			});
		}
	}
	
	$scope.crearCotizacion = function(ficha_form) {
		if ($scope.validate_form(ficha_form)) {
			$scope.ficha.paciente_id = $scope.paciente.id;
			if ($scope.medico != undefined && $scope.medico.selected != undefined) {
				$scope.ficha.medico_id = $scope.medico.selected.id;
			}
			else {
				$scope.ficha.medico_id = null;
			}
			$scope.ficha.precio_total = $scope.precio_total_edit;
			$scope.ficha.procedencia_id = $scope.procedencia.selected.id;
			$scope.ficha.examenesAgregados = $scope.examenesAgregados;
			$scope.ficha.prevision_id = $scope.prevision.selected.id;
			$scope.ficha.detalles_ficha = null;
			console.log("Antes de update");
			Cotizacion.new($scope.ficha).$promise.then(function(response) {
				$state.go('loginRequired.cotizaciones.info', {
					cotizacion_id : response.data.id
				});
			}, function(response) {
				console.log("ERROR creando ficha");
			});
		}
	}

	$scope.getPrecioTotal = function() {
		console.log('Calculando nuevo precio');
		var total = 0;
		var examenes = $scope.examenesSeleccionados_edit;

		for (var i = 0; i < examenes.length; i++) {
			if (examenes[i].perfil) {
				var perfil = examenes[i];
				for (var j = 0; j < perfil.examenes.length; j++) {
					var examen = perfil.examenes[j];

					if (examen.tarifa_prevision != null && examen.tarifa_prevision != null) {
						examen.precio = examen.tarifa_prevision.precio;
						total = total + examen.tarifa_prevision.precio;
					}
				}
			}
			else {
				if (examenes[i].examen.tarifa_prevision) {
					examenes[i].precio = examenes[i].examen.tarifa_prevision.precio;
					total = total + examenes[i].examen.tarifa_prevision.precio;
				}
			}
		}
		$scope.precio_total_edit = total;
	}
});

