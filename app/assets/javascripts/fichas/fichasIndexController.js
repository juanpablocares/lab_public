angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas, Perfiles, TiposPago, DetallesPagoFicha) {

	$scope.precio_total=0;
	
	//Recobrar paciente desde el menu
	$scope.$on('pacienteFromMenu', function(event, data) {
		if (data != undefined) {
			data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
			$scope.paciente = data;
			//Obtener ficha buscada
			Fichas.id.get({
				id : $stateParams.ficha_id
			}).$promise.then(function(result) {
				if ($stateParams.paciente_id == null) {
					$state.go('loginRequired.paciente.ficha', {
						paciente_id : result.data.paciente_id,
						ficha_id : result.data.id
					});
				}
				else {
					$scope.ficha = result.data;
					$scope.ordenarExamenes();
					$scope.setInfoTab();
				}

			}).catch(function(response) {
				console.error('Error al obtener ficha');
				$state.go('loginRequired.index');
			});

		}
	});
	$scope.$emit('PedirPacienteFromMenu');

	$scope.setPreciosExamenes = function() {
		angular.forEach($scope.examenesSeleccionados, function(value, key) {
			if (value.perfil) {
				value.precio_total = 0;
				angular.forEach(value.detalles_ficha, function(value2, key2) {
					value2.precio = $scope.getPrecioDetalleFicha($scope.paciente.prevision.tarifa_id, value2.examen);
					value.precio_total += value2.precio;
				});
				$scope.precio_total += value.precio_total;
			}
			else {
				value.precio = $scope.getPrecioDetalleFicha($scope.paciente.prevision.tarifa_id, value.examen);
				$scope.precio_total += value.precio;
			}
			
		});
	}

	$scope.getPrecioDetalleFicha = function(tarifa_id, examen) {
		for ( i = 0; i < examen.tarifas_examen.length; i++) {
			var value= examen.tarifas_examen[i];
			if (value.tarifa_id == tarifa_id) {
				return value.precio;
			}
		}
		return 0;
	}
	
	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	//Obtener tipos de pago para select
	TiposPago.root.get({}).$promise.then(function(result) {
		$scope.tiposPagoArray = result.data;
	}).catch(function(response) {
		console.error('Error al obtener tipos de pago');
	});

	$scope.setInfoTab = function() {
		$scope.tabs = {};
		$scope.tabs.infoTab = true;
	};

	$scope.setPagosTab = function() {
		$scope.tabs = {};
		$scope.tabs.pagosTab = true;
	};

	/* TAB INFO */
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};

	$scope.ordenarExamenes = function(tarifa_id) {
		var i = 0;
		while (i < $scope.ficha.detalles_ficha.length) {
			value = $scope.ficha.detalles_ficha[i];
			if (value.perfil_id != null) {

				//es perfil

				var perfilTemp = value.perfil;
				perfilTemp.detalles_ficha = [];
				perfilTemp.perfil = true;
				var j = 0;
				while (j < $scope.ficha.detalles_ficha.length) {
					value2 = $scope.ficha.detalles_ficha[j];
					if (value.perfil_id == value2.perfil_id) {
						perfilTemp.detalles_ficha.push(value2);
						if (value.id == value2.id)
							i--;
						$scope.ficha.detalles_ficha.splice(j, 1);
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
	};

	/* END TAB INFO */

	/* TAB PAGOS */

	$scope.detallePagos = [];
	$scope.nuevoPago = {};

	Fichas.id.getPagosRealizados({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		$scope.detallePagos = result.data;
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
	/* END TAB PAGOS */

});
