angular.module('lab').controller('FichasPagosController', function($scope, 
	$auth, $state, $http, $stateParams, Ficha, $interval,
	TiposPagos, Fichas, Perfiles, DetallesPagoFicha, previsionesService, DetallePagoFicha, Previsiones) {
	
	$scope.loading = true;	
	$scope.precio_total=0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	$scope.detallePagos = [];
	$scope.input_pago = {};
	$scope.nuevoPago = {};
	$scope.tiposPagoArray = [];
	$scope.total_bonos = 0;
	$scope.total_otros = 0;
	$scope.edit = true;
	
	//inicializar input_pago
	$scope.inicializar_pago = function(){
		$scope.input_pago = {};
		var now = new Date();
		$scope.input_pago.fecha_creacion =  new Date((now.getMonth()+1)+"/"+(now.getDate()<10?"0"+now.getDate():now.getDate())+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes());
		$scope.input_pago.nombre = $auth.user.nombre + " " + $auth.user.apellido_paterno;
	}

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
            
            if(!previsionesService.getPrevisiones())
			{
				Previsiones.all.get().$promise.then(function(data) {
					previsionesService.setPrevisiones(data.previsiones);
					$scope.previsionesArray = previsionesService.getPrevisiones();
					$scope.prevision = $scope.setPrevisionSeleccionada($scope.ficha.prevision);
				}, function(data) {
					console.error('ERROR getting previsiones');
				});
			}
			else
			{
				$scope.previsionesArray = previsionesService.getPrevisiones();
				$scope.prevision = $scope.setPrevisionSeleccionada($scope.ficha.prevision);
			}

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

	$scope.seleccionarPrevision = function(prevision)
	{
		$scope.prevision = prevision;
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
			var now = new Date($scope.detallePagos[i].creado);
			$scope.detallePagos[i].fecha_creacion =  new Date((now.getMonth()+1)+"/"+(now.getDate()<10?"0"+now.getDate():now.getDate())+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes());
		}
		$scope.inicializar_pago();
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

	$scope.setPrevisionSeleccionada = function(prevision) {
		for (var i = 0; i < $scope.previsionesArray.length; i++) {
			var value = $scope.previsionesArray[i];
			if (value.id == prevision.id) {
				return value;
			}
		};
	};

	$scope.guardar_observacion = function(obs){
		$scope.post = {};
		$scope.post.observaciones_pagos = obs;
		$scope.post.prevision = $scope.prevision;

		Fichas.observaciones.update({
			id: $stateParams.ficha_id
		},$scope.post).$promise.then(function(response) {
			$scope.$emit('showGlobalAlert', {boldMessage: 'Editar Pagos', message: 'Cambios guardados satisfactoriamente.',class: 'alert-success'});
		}, function(response) {
			console.log("Error actualizando observaciones pagos");
		});
	}
	
	$scope.submitIngresarPagoForm = function(f) {
		
		var mssg = "Falta ingresar: <ul>";
		
		if(!f.tipo_pago)
			mssg += "<li>Tipo de Pago</li>";
		if(!f.n_documento)
			mssg += "<li>N° documento</li>";
		if(!f.monto_pagado)
			mssg += "<li>Monto</li>";
		
		mssg += "</ul>";

		if(!f.tipo_pago || !f.n_documento || !f.monto_pagado){
			console.log(mssg);
			$scope.$emit('showGlobalAlert', {boldMessage: 'Nuevo Pago ', message: mssg,class: 'alert-danger'});
			return ;
		}
		
		data = {
			ficha_id : $stateParams.ficha_id,
			tipo_pago_id : f.tipo_pago.id,
			n_documento : f.n_documento,
			monto_pagado : f.monto_pagado,
			user_id : $auth.user.id,
			factura: f.factura,
		};
		
		DetallesPagoFicha.root.new(data).$promise.then(function(response) {
			var nuevo_pago = response.data;
			nuevo_pago.fecha_creacion = new Date(nuevo_pago.creado);
			nuevo_pago.nuevo = true;
			$scope.detallePagos.unshift(nuevo_pago);
			$scope.inicializar_pago();
		}, function(response) {
			$scope.$emit('showGlobalAlert', {boldMessage: 'Nuevo Pago', message: 'Error al guardar el pago.',class: 'alert-danger'});
		});
	}

	$scope.setPagoChanged = function(pago , value){
		pago.changed = value;
	}

	$scope.pagoUpdate = function(pago)
	{
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
		$scope.total_bonos = 0;
		$scope.total_otros = 0;
		while (i < $scope.detallePagos.length) {
			
			if($scope.detallePagos[i].tipo_pago.nombre.indexOf("Bono") >= 0)
				$scope.total_bonos += $scope.detallePagos[i].monto_pagado;
			
			total = total + $scope.detallePagos[i].monto_pagado;
			i++;
		}
		$scope.total_otros = total - $scope.total_bonos;
		return total;
	}
});
