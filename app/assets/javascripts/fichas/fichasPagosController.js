angular.module('lab').controller('FichasPagosController', function($scope, 
	$auth, $state, $http, $stateParams, Ficha, 
	TiposPagos, Fichas, Perfiles, DetallesPagoFicha, DetallePagoFicha) {
	
	$scope.loading = true;	
	$scope.precio_total=0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	$scope.detallePagos = [];
	$scope.nuevoPago = {};
	$scope.tiposPagoArray = [];
	
	Ficha.get({
        id : $stateParams.ficha_id
		}, function(datos) {
	        $scope.ficha = datos.data;
            $scope.ficha.paciente.fecha_nacimiento = new Date($scope.ficha.paciente.fecha_nacimiento);
            $scope.ficha.paciente.rut_completo = $scope.ficha.paciente.rut+""+$scope.ficha.paciente.rutdv;
            $scope.ficha.paciente.getEdad = function() {
                    if ($scope.ficha.paciente != null) {
                            var d = new Date();
                            var meses = 0;
                            if ($scope.ficha.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth() > 0)
                                    meses += 12 - $scope.ficha.paciente.fecha_nacimiento.getUTCMonth() + d.getMonth();
                            else
                                    meses = Math.abs($scope.ficha.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth());
                            var birthday = +new Date($scope.ficha.paciente.fecha_nacimiento);
                            var anios = ((Date.now() - birthday) / (31556926000));
                            return ~~anios + " Años " + ~~meses + " meses";
                    }
            };
            $scope.nuevoPago.observaciones_pagos = $scope.ficha.observaciones_pagos;
            $scope.paciente = $scope.ficha.paciente;
			$scope.ordenarExamenes();
	});


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
		$scope.precio_total = $scope.ficha.precio_total;
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
	};

	//Obtener tipos de pago para select
	TiposPagos.root.get({}).$promise.then(function(result) {
		$scope.tiposPagoArray = result.data;
	}).catch(function(response) {
		console.error('Error al obtener tipos de pago');
	});

	Fichas.id.getPagosRealizados({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		$scope.detallePagos = result.data;
		for (var i = 0; i < $scope.detallePagos.length; i++)
		{
			$scope.detallePagos[i].fecha_creacion = new Date($scope.detallePagos[i].creado);
		}
		$scope.loading = false;
	}).
	catch(function(response) {
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
				n_documento : $scope.nuevoPago.numero_documento,
				monto_pagado : $scope.nuevoPago.monto,
				user_id : $auth.user.id,
				observaciones_pagos: $scope.nuevoPago.observaciones_pagos,
				factura: $scope.nuevoPago.factura,
			};
			DetallesPagoFicha.root.new(data).$promise.then(function(response) {
				DetallesPagoFicha.by_ficha_id.all({
					id : $stateParams.ficha_id
				}).$promise.then(function(result) {
					$scope.detallePagos = result.data;
					$scope.resetIngresarPagoForm(f);
				}).catch(function(response) {
					console.error("Error al cargar detalle pagos");
				});
			}, function(response) {
				alert("Error creando el pago");
			});
		}
	}

	$scope.setPagoChanged = function(pago , value){
		pago.changed = value;
	}

	$scope.pagoUpdate = function(pago)
	{
		console.log(pago.creado);

		pago.tipo_pago_id = pago.tipo_pago.id;
		pago.saving = true;
		pago.creado = pago.fecha_creacion.toJSON();
		console.log(pago.creado);
		DetallePagoFicha.update({id: pago.id}, pago).$promise.then(function(response){
			pago.changed = false;
			pago.saving = false;
			console.log("update pago");
		},function(response){
			pago.saving = false;
			console.log("Error al hacer update pago");
		});
	}

	$scope.pagoDelete = function(pago)
	{
		if( confirm("¿Está seguro de eliminar este pago?"))
		{
			pago.deleting = true;
			DetallePagoFicha.delete({id: pago.id}).$promise.then(function(response){
				console.log("Delete pago successful");
				pago.changed = false;
				var index = $scope.detallePagos.indexOf(pago);
				$scope.detallePagos.splice(index, 1);
			},function(response){
				console.log("Error al hacer delete pago");
				pago.deleting = false;
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
});
