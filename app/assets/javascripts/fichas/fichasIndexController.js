angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas, Perfiles, TiposPago, Medicos, Procedencias, Examenes, DetallesPagoFicha, Ficha) {

	$scope.edit = false;
	$scope.loading = true;
	$scope.procedencia = {};
	$scope.examenesBorrados = [];
	$scope.examenesAgregados = [];
	$scope.medicosArray = [];
	$scope.procedenciasArray = [];
	$scope.examenesArray = [];
	$scope.medico = {};
	$scope.examenes = {};
	$scope.perfiles = {};
	$scope.precio_total = 0;
	$scope.precio_total_edit = 0;
	$scope.total_pagos = 0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	$scope.ficha_edit = {};
	$scope.examenesSeleccionados_edit = [];
	$scope.paciente = {};

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
		else {
			$scope.examenesBorrados.push(item);
		}
		$scope.getPrecioTotal(true);
	};

	$scope.setProcedenciaSeleccionada = function(ficha_procedencia) {
		for (var i = 0; i < $scope.procedenciasArray.length; i++) {
			var value = $scope.procedenciasArray[i];
			if (value.id == ficha_procedencia.id) {
				return value;
			}
		};
	};

	$scope.setMedicoSeleccionado = function(ficha_medico) {
		if (ficha_medico != null && $scope.medicosArray.length > 0) {
			for (var i = 0; i < $scope.medicosArray.length; i++) {
				var value = $scope.medicosArray[i];
				if (value.id == ficha_medico.id) {
					return value;
				}
			};
		}
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
		model.nuevo = true;
		model = $scope.limpiarTarifas(model);
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

		console.log(model);

		model.delete = true;
		$scope.examenesSeleccionados_edit.push(model);
		console.log($scope.examenesSeleccionados_edit);
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	};

	$scope.setEstadoExamenes = function() {
		for ( i = 0; i < $scope.examenesSeleccionados.length; i++) {
			value = $scope.examenesSeleccionados[i];
			if (value.perfil) {
				value.delete = true;
				for ( j = 0; j < value.examenes.length; j++) {
					value2 = value.examenes[j];
					value2.estado = {};
					if (value2.usuario_muestra_id == null) {
						value2.estado.class = 'warning';
						value2.estado.texto = 'Toma de muestra pendiente';
					}
					else {
						if (value2.resultados_examen.length == value2.examen.sustancias.length) {
							value.delete = false;
							value2.estado.texto = 'Resultados ingresados';
							value2.estado.class = 'info';
						}
						else
						if (value2.resultados_examen.length < value2.examen.sustancias.length || value2.examen.sustancias.length == 0) {
							value.delete = false;
							value2.estado.class = 'success';
							value2.estado.texto = 'Ingreso de resultados';
						}
						else {
							value2.estado.class = 'danger';
							value2.estado.texto = 'Error en resultados';
						}
					}
				}
			}
			else {
				value.delete = true;
				value.estado = {};
				if (value.usuario_muestra_id == null) {
					value.estado.class = 'warning';
					value.estado.texto = 'Toma de muestra pendiente';
				}
				else {
					if (value.resultados_examen.length == value.examen.sustancias.length) {
						value.delete = false;
						value.estado.texto = 'Resultados ingresados';
						value.estado.class = 'info';
					}
					else
					if (value.resultados_examen.length < value.examen.sustancias.length || value.examen.sustancias.length == 0) {
						value.delete = false;
						value.estado.class = 'success';
						value.estado.texto = 'Ingreso de resultados';
					}
					else {
						value.estado.class = 'danger';
						value.estado.texto = 'Error en resultados';
					}
				}
			}
		}
	};

	$scope.ordenarExamenes = function(tarifa_id) {
		var i = 0;
		detalles = angular.copy($scope.ficha.detalles_ficha);
		$scope.examenesSeleccionados = [];

		while (i < detalles.length) {
			value = detalles[i];
			if (value.perfil_id != null) {
				//es perfil
				var perfilTemp = value.perfil;
				perfilTemp.examenes = [];
				perfilTemp.perfil = true;
				var j = 0;
				while (j < detalles.length) {
					value2 = detalles[j];
					if (value.perfil_id == value2.perfil_id) {
						//Cambio para evitar perfil circular
						value2.perfil = null;
						//END cambio
						perfilTemp.examenes.push(value2);
						if (value.id == value2.id)
							i--;
						detalles.splice(j, 1);
					}
					else
						j++;
				}
				$scope.examenesSeleccionados.push(perfilTemp);
			}
			else {
				$scope.examenesSeleccionados.push(value);
			}
			i++;
		}
		$scope.precio_total = $scope.ficha.precio_total;
		console.log($scope.examenesSeleccionados);
		$scope.setEstadoExamenes();
	};

	$scope.detallePagos = [];
	$scope.nuevoPago = {};

	$scope.getTotalPagos = function() {
		var total = 0;
		var i = 0;
		while (i < $scope.detallePagos.length) {
			total = total + $scope.detallePagos[i].monto_pagado;
			i++;
		}
		return total;
	}

	Fichas.id.getPagosRealizados({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		$scope.detallePagos = result.data;
		$scope.total_pagos = $scope.getTotalPagos();
		$scope.loading = false;
	}).catch(function(response) {
		console.error("Error al cargar detalle pagos");
	});

	$scope.limpiarTarifas = function(model) {
		if (model == null) {
			for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
				var temp1 = angular.copy($scope.examenesSeleccionados_edit[i]);
				if (!temp1.perfil) {
					temp3 = temp1.examen;
					var temp = null;
					for (var i = 0; i < temp3.tarifas_examen.length; i++) {
						value = temp3.tarifas_examen[i];
						if (value.tarifa_id == $scope.paciente.prevision.tarifa_id) {
							temp = value;
						}
					}
					temp3.tarifas_examen = [temp];
				}
				else {
					for (var i = 0; i < temp1.examenes.length; i++) {
						aux = temp1.examenes[i];
						var value = null;
						var temp = null;
						console.log(aux);
						if (temp1.nuevo)
							value = aux;
						else
							value = aux.examen;

						for (var j = 0; j < value.tarifas_examen.length; j++) {
							if (value2 != null && value2.tarifa_id == $scope.paciente.prevision.tarifa_id) {
								temp = value2;
							}
						}
						value.tarifas_examen = [temp];
					}
				}
			}
		}
		else {
			if (!model.perfil) {
				var temp = null;
				for (var i = 0; i < model.tarifas_examen.length; i++) {
					value = model.tarifas_examen[i];
					if (value.tarifa_id == $scope.paciente.prevision.tarifa_id) {
						temp = value;
					}
				}
				model.tarifas_examen = [temp];
			}
			else {
				for (var i = 0; i < model.examenes.length; i++) {
					aux = model.examenes[i];
					var value = null;
					var temp = null;
					value = aux;
					for (var j = 0; j < value.tarifas_examen.length; j++) {
						value2 = value.tarifas_examen[j];
						if (value2.tarifa_id == $scope.paciente.prevision.tarifa_id) {
							temp = value2;
						}
					}
					value.tarifas_examen = [temp];
				}
			}
			return model;
		}
	}

	$scope.getPrecioTotal = function(edit) {
		var total = 0;
		if (edit) {
			var examenes = $scope.examenesSeleccionados_edit;
		}
		else {
			var examenes = $scope.examenesSeleccionados;
		}
		for (var i = 0; i < examenes.length; i++) {
			if (examenes[i].perfil) {
				var perfil = examenes[i];
				for (var j = 0; j < perfil.examenes.length; j++) {
					var examen = null;
					if (perfil.examenes[j].nuevo)
						examen = perfil.examenes[j];
					else
						examen = perfil.examenes[j].examen;
					if (examen.tarifas_examen.length > 0 && examen.tarifas_examen[0] != null) {
						examen.precio = examen.tarifas_examen[0].precio;
						total = total + examen.tarifas_examen[0].precio;
					}
				}
			}
			else {
				if (examenes[i].examen.tarifas_examen.length > 0) {
					examenes[i].precio = examenes[i].examen.tarifas_examen[0].precio;
					total = total + examenes[i].examen.tarifas_examen[0].precio;
				}
			}
		}
		if (edit) {
			$scope.precio_total_edit = total;
		}
		else {
			$scope.precio_total = total;
		}
	}
	//Recobrar ficha desde el menu
	$scope.$on('fichaFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.ficha = data;
			$scope.paciente = $scope.ficha.paciente;
			$scope.ficha.numero_programa = parseInt($scope.ficha.numero_programa, 10);
			if ($scope.ficha.receptor)
				$scope.ficha.restringido = true;
			$scope.ordenarExamenes();

			Medicos.buscar.todos().$promise.then(function(response) {
				$scope.medicosArray = response.data;
				$scope.medico.selected = $scope.setMedicoSeleccionado($scope.ficha.medico);
			}, function(response) {
				console.log("ERROR obteniendo medicos");
			});

			Procedencias.buscar.todos().$promise.then(function(response) {
				$scope.procedenciasArray = response.data;
				$scope.procedencia.selected = $scope.setProcedenciaSeleccionada($scope.ficha.procedencia);
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
		}

		$scope.ficha_edit = $scope.ficha;
	});
	$scope.$emit('PedirFichaFromMenu');

	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	$scope.back_to_info = function() {
		$scope.edit = false;
		$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
		$scope.ficha_edit = angular.copy($scope.ficha);
		$scope.precio_total_edit = angular.copy($scope.precio_total);
	}

	$scope.go_to_edit = function() {
		$scope.edit = true;
		$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
		$scope.ficha_edit = angular.copy($scope.ficha);
		$scope.precio_total_edit = angular.copy($scope.precio_total);
	}

	$scope.guardar_cambios_ficha = function(ficha_form) {
		if ($scope.validate_form(ficha_form)) {
			if ($scope.medico != undefined && $scope.medico.selected != undefined) {
				$scope.ficha_edit.medico_id = $scope.medico.selected.id;
			}
			else {
				$scope.ficha_edit.medico_id = null;
			}
			$scope.ficha_edit.precio_total = $scope.precio_total_edit;
			$scope.ficha_edit.procedencia_id = $scope.procedencia.selected.id;
			$scope.ficha_edit.examenesAgregados = $scope.examenesAgregados;
			$scope.ficha_edit.examenesBorrados = $scope.examenesBorrados;
			$scope.ficha_edit.detalles_ficha = null;
			Ficha.update({
				id : $scope.ficha.id
			}, $scope.ficha_edit).$promise.then(function(response) {
				$scope.edit = false;
				$scope.examenesSeleccionados = [];
				$scope.examenesSeleccionados = angular.copy($scope.examenesSeleccionados_edit);
				$scope.examenesSeleccionados_edit = [];
				$scope.examenesAgregados = [];
				$scope.examenesBorrados = [];
				$scope.ficha = response.data;
				$scope.precio_total = angular.copy($scope.precio_total_edit);
				$scope.$emit('fichaFromEdit', $scope.ficha);
				$scope.ordenarExamenes();
				$state.go('loginRequired.fichas.info', {
					ficha_id : response.data.id
				});
			}, function(response) {
				console.log("ERROR creando ficha");
			});
		}
	}
	$scope.borrarMedico = function() {
		$scope.ficha_edit.medico = null;
		$scope.ficha_edit.medico_id = null;
		$scope.medico.selected = null;
	}

	$scope.validate_form = function(ficha_form) {
		return $scope.examenesSeleccionados_edit.length > 0 && ficha_form.$valid;
	}
});
