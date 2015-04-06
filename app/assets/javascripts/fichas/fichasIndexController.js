angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas, Perfiles, TiposPago, DetallesPagoFicha) {

	//Recobrar paciente desde el menu
	$scope.$on('pacienteFromMenu', function(event, data) {
		console.log("recibir paciente");
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		$scope.paciente = data;
		console.log($scope.paciente);
	});

	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

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

	$scope.ordenarExamenes = function() {
		var i = 0;
		while (i < $scope.ficha.detalles_ficha.length) {
			value = $scope.ficha.detalles_ficha[i];
			if (value.perfil_id != null) {
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
