angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas, Perfiles, TiposPago, DetallesPagoFicha) {

	$scope.loading = true;

	$scope.precio_total = 0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};

	$scope.setEstadoExamenes = function() {
		for ( i = 0; i < $scope.examenesSeleccionados.length; i++) {
			value = $scope.examenesSeleccionados[i];
			if (value.perfil) {
				for ( j = 0; j < value.detalles_ficha.length; j++) {
					value2 = value.detalles_ficha[j];
	
					value2.estado = {};
	
					if (value2.usuario_muestra_id == null) {
						value2.estado.class = 'warning';
						value2.estado.texto = 'Toma de muestra pendiente';
					}
					else {
						if (value2.resultados_examen.length == value2.examen.sustancias.length) {
							value2.estado.texto = 'Resultados ingresados';
							value2.estado.class = 'info';
						}
						else
						if (value2.resultados_examen.length < value2.examen.sustancias.length || value2.examen.sustancias.length == 0) {
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
				value.estado = {};

				if (value.usuario_muestra_id == null) {
					value.estado.class = 'warning';
					value.estado.texto = 'Toma de muestra pendiente';
				}
				else {
					if (value.resultados_examen.length == value.examen.sustancias.length) {
						value.estado.texto = 'Resultados ingresados';
						value.estado.class = 'info';
					}
					else
					if (value.resultados_examen.length < value.examen.sustancias.length || value.examen.sustancias.length == 0) {
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
		console.log($scope.examenesSeleccionados);
	};

	$scope.setPreciosExamenes = function() {
		angular.forEach($scope.examenesSeleccionados, function(value, key) {
			if (value.perfil) {
				value.precio_total = 0;
				angular.forEach(value.detalles_ficha, function(value2, key2) {
					value2.precio = $scope.getPrecioDetalleFicha($scope.ficha.paciente.prevision.tarifa_id, value2.examen);
					value.precio_total += value2.precio;
				});
				$scope.precio_total += value.precio_total;
			}
			else {
				value.precio = $scope.getPrecioDetalleFicha($scope.ficha.paciente.prevision.tarifa_id, value.examen);
				$scope.precio_total += value.precio;
			}
		});
	}

	$scope.getPrecioDetalleFicha = function(tarifa_id, examen) {
		for ( i = 0; i < examen.tarifas_examen.length; i++) {
			var value = examen.tarifas_examen[i];
			if (value.tarifa_id == tarifa_id) {
				return value.precio;
			}
		}
		return 0;
	}
	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	$scope.ordenarExamenes = function(tarifa_id) {
		var i = 0;
		detalles = angular.copy($scope.ficha.detalles_ficha);

		while (i < detalles.length) {
			value = detalles[i];
			if (value.perfil_id != null) {

				//es perfil

				var perfilTemp = value.perfil;
				perfilTemp.detalles_ficha = [];
				perfilTemp.perfil = true;
				var j = 0;
				while (j < detalles.length) {
					value2 = detalles[j];
					if (value.perfil_id == value2.perfil_id) {
						perfilTemp.detalles_ficha.push(value2);
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
		$scope.setPreciosExamenes();
		$scope.setEstadoExamenes();
	};

	//Obtener tipos de pago para select
	TiposPago.root.get({}).$promise.then(function(result) {
		$scope.tiposPagoArray = result.data;
	}).catch(function(response) {
		console.error('Error al obtener tipos de pago');
	});

	$scope.detallePagos = [];
	$scope.nuevoPago = {};

	Fichas.id.getPagosRealizados({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		$scope.detallePagos = result.data;
		$scope.loading = false;
	}).catch(function(response) {
		console.error("Error al cargar detalle pagos");
	});

	$scope.resetIngresarPagoForm = function(f) {
		$scope.nuevoPago = {};
		f.$setPristine();
		f.$setUntouched();
	}

	$scope.submitIngresarPagoForm = function(f) {

		if (f.$valid && confirm('Confirme ingreso de pago.')) {
			data = {
				ficha_id : $stateParams.ficha_id,
				tipo_pago_id : $scope.nuevoPago.tipo_pago.id,
				monto_pagado : $scope.nuevoPago.monto,
			};
			DetallesPagoFicha.root.new(data).$promise.then(function(response) {
				DetallesPagoFicha.by_ficha_id.all({
					id : $stateParams.ficha_id
				}).$promise.then(function(result) {
					$scope.detallePagos = result.data;
					$scope.resetIngresarPagoForm();
				}).catch(function(response) {
					console.error("Error al cargar detalle pagos");
				});
			}, function(response) {
				alert("Error creando el pago");
			});
		}
	}

	$scope.getTotalPagos = function() {
		var total = 0;
		var i = 0;
		while (i < $scope.detallePagos.length) {
			total = total + $scope.detallePagos[i].monto_pagado;
			i++;
		}
		return total;
	}
	//Recobrar ficha desde el menu
	$scope.$on('fichaFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.ficha = data;
			$scope.ordenarExamenes();
		}
	});
	$scope.$emit('PedirFichaFromMenu');

});
