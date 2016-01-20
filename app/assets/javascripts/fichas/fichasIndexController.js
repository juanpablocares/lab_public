angular.module('lab').controller('FichasIndexController', function(
	$scope, $auth, $state, $http, $stateParams, $filter,
	Fichas, Previsiones, Perfiles, Medicos, Medico, ngDialog,
	Procedencias, Examenes, DetallesPagoFicha, 
	Ficha, previsionesService, examenesService, medicosService,
	procedenciasService, perfilesService) {

	//Esta vista tiene campos editables, con $scope.edit aviso a las vistas si mostrar algunos campos editables o fijos.
	$scope.edit = true;
	//$scope.saving es true para desactivar botones de save para evitar doble input. (creo que no verifica submit con teclado)
	$scope.saving = false;
	$scope.loading = true;
	$scope.guardado = false;
	$scope.checked = false;
	$scope.procedencia = {};
	$scope.examenesBorrados = [];
	$scope.examenesAgregados = [];
	$scope.medicosArray = [];
	$scope.procedenciasArray = [];
	$scope.previsionesArray = [];
	$scope.examenesArray = [];
	$scope.medico = {};
	$scope.prevision = {};
	$scope.examenes = {};
	$scope.perfiles = {};
	
	$scope.precio_total = 0;
	$scope.copago_total = 0;
	$scope.precio_particular_total_edit = 0;

	$scope.precio_total_edit = 0;
	$scope.copago_total_edit = 0;
	$scope.precio_particular_total= 0;

	$scope.total_pagos = 0;
	$scope.total_pagos_bonos = 0;
	$scope.total_pagos_boletas = 0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	$scope.ficha_edit = {};
	$scope.examenesSeleccionados_edit = [];
	$scope.paciente = {};
	$scope.selectModel = {};
	$scope.countExamenes = 0;
	$scope.total_prevision = 0;

	$scope.medicosFiltered = [];
	$scope.medicoDisplayStyle = {
		apellido_paterno : 0,
		apellido_materno : 0,
		nombre : 0,
		especialidad : 0,
		apellido_paterno_style : 'display: inline-block; width: 6ex;',
		apellido_materno_style : 'display: inline-block; width: 6ex;',
		nombre_style : 'display: inline-block; width: 6ex;',
		especialidad_style : 'display: inline-block; width: 6ex;'
	};

	var limitStep = 100;
	$scope.limit = limitStep;
	$scope.ficha_edit.medico_input = '';

	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
	{
		$state.go('loginRequired.busqueda_ficha');
	}
	
	$http.get('/api/especialidades').success(function(data) {
		$scope.especialidades = data.especialidades;
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/instituciones').success(function(data) {
		$scope.instituciones = data.instituciones;
	}).error(function(data) {
		// log error
	});
	
	Ficha.get({
        id : $stateParams.ficha_id
		}).$promise.then(function(datos) {
	        $scope.ficha = datos.data;
	        $scope.setPaciente($scope.ficha);
            $scope.precio_total = $scope.precio_total_edit = $scope.ficha.precio_total;
            $scope.ficha.numero_programa = parseInt($scope.ficha.numero_programa, 10);
            if ($scope.ficha.receptor)
                $scope.ficha.restringido = true;
            $scope.ordenarExamenes();

			if(!medicosService.getMedicos())
			{
				Medicos.buscar.todos().$promise.then(function(data) {
					medicosService.setMedicos(data.data);
					$scope.medicosArray = medicosService.getMedicos();
				}, function(response) {
					console.error('ERROR obteniendo medicos');
				});
			}
			else
			{
				$scope.medicosArray = medicosService.getMedicos();
			}

			$scope.medicosFiltered = $filter('medicoFilter')($scope.medicosArray, $scope.ficha_edit.medico_input);
			$scope.medicosFiltered = $filter('limitTo')($scope.medicosArray, $scope.limit);

			if(!procedenciasService.getProcedencias())
			{
				Procedencias.buscar.todos().$promise.then(function(data) {
					procedenciasService.setProcedencias(data.data);
					$scope.procedenciasArray = procedenciasService.getProcedencias();
				}, function(data) {
					console.error('ERROR getting procedencias');
				});
			}
			else
			{
				$scope.procedenciasArray = procedenciasService.getProcedencias();
			}

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

			if(!examenesService.getExamenes())
			{
				Examenes.all.index({
				}).$promise.then(function(data) {
					examenesService.setExamenes(data.data);
					$scope.examenes = examenesService.getExamenes();
					$scope.crearExamenesArray();
				}, function(response) {
					console.error('ERROR obteniendo examenes');
				});
			}
			else
			{
				$scope.examenes = examenesService.getExamenes();
				$scope.crearExamenesArray();
			}

			if(!perfilesService.getPerfiles())
			{
				Perfiles.buscar.todos().$promise.then(function(data) {
					perfilesService.setPerfiles(data.data);
					$scope.perfiles = perfilesService.getPerfiles();
					$scope.crearExamenesArray();
				}, function(data) {
					console.error('ERROR getting perfiles');
				});
			}
			else
			{
				$scope.perfiles = perfilesService.getPerfiles();
				$scope.crearExamenesArray();	
			}

			$scope.ficha_edit = angular.copy($scope.ficha);
			$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
			$scope.limpiarTarifas();
	}, function(response) {
		console.error('ERROR obteniendo ficha con id '+$stateParams.ficha_id);
		$scope.$emit('showGlobalAlert', {boldMessage: 'Información Ficha', message: 'N° Ficha no encontrado.',class: 'alert-danger'});
		$state.go('loginRequired.busqueda_ficha');
	});

	$scope.toggleAllCheckbox = function(checkbox){
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var value = $scope.examenesSeleccionados_edit[i];
			if(value.valido_impresion)
			{
				value.checked = checkbox;
			}
		};
	}

	$scope.setPaciente = function(ficha)
	{
		$scope.paciente = ficha.paciente;
		if(ficha == null || ficha.email == null || ficha.email.trim() == '')
		{
			ficha.email = $scope.paciente.correo;	
		} 
		
        $scope.paciente.rut_completo = $scope.paciente.rut+''+$scope.paciente.rutdv;
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
                    return ~~anios + ' Años ' + ~~meses + ' meses';
            }
        };
        $scope.paciente.getFormatedBirth = function()
        {	
        	var day = $scope.paciente.fecha_nacimiento.getUTCDate();
        	if(day<10)day = '0'+day;
        	return day+'/'+($scope.paciente.fecha_nacimiento.getUTCMonth()+1)+'/'+$scope.paciente.fecha_nacimiento.getFullYear();
        }
        ficha.paciente = $scope.paciente;
	}

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
					if (value2 != null && value2.tarifa_id == $scope.ficha.prevision.tarifa_id) {
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
				if (tarifa.tarifa_id == $scope.ficha.prevision.tarifa_id) {
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
		else {
			$scope.examenesBorrados.push(item);
		}
		$scope.getPrecioTotal(true);
	};

	$scope.setPrevisionSeleccionada = function(prevision) {
		for (var i = 0; i < $scope.previsionesArray.length; i++) {
			var value = $scope.previsionesArray[i];
			if (value.id == prevision.id) {
				return value;
			}
		};
	};

	$scope.agruparPerfiles = function(item) {
		if (item.perfil)
			return 'Perfiles';
		else
			return 'Exámenes';
	};

	$scope.seleccionarPrevision = function(prevision)
	{
		//Se cambia la prevision. Debe cambiar en el registro del paciente, de la ficha
		//y actualizar los precios de los examenes realizados a la tarifa de la nueva prevision.
		$scope.ficha_edit.prevision = prevision;
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	}

	$scope.seleccionarMedico = function(model) {
		$scope.ficha_edit.medico = model;
		$scope.ficha_edit.medico_input = '';
	}


	$scope.seleccionarExamen = function(model2) {
		var model = angular.copy(model2);
		$scope.selectModel.selected = null;
		model.nuevo = true;
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

/* 		//No permitir examenes duplicados
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var value = $scope.examenesSeleccionados_edit[i];
			if (perfil && value.perfil) {
				if (model.id == value.id) {
					$scope.$emit('showGlobalAlert', {boldMessage: 'Agregar perfil', message: 'Operación inválida. El perfil ya fue agregado.',class: 'alert-warning'});
					return;
				}
			}
			else
			if (!perfil && !value.perfil) {
				if (model.examen.id == value.examen.id) {
					$scope.$emit('showGlobalAlert', {boldMessage: 'Agregar examen', message: 'Operación inválida. El examen ya fue agregado.',class: 'alert-warning'});
					return;
				}
			}
		};

*/

		if (perfil) {
			$scope.examenesAgregados.push(model);
		}
		else {
			$scope.examenesAgregados.push(model.examen);
		}
		model.delete = true;
		$scope.examenesSeleccionados_edit.push(model);
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	};

	$scope.countResultadosParametrosValidados = function(resultados_examen)
	{
		var count = 0;
		for (var i = 0; i < resultados_examen.length; i++)
		{
			var value = resultados_examen[i];
			if(value.usuario_valida_id != null)
				count++;
		}
		return count;
	}

	$scope.setEstadoExamenes = function() {
		for ( i = 0; i < $scope.examenesSeleccionados.length; i++) {
			value = $scope.examenesSeleccionados[i];
			if (value.perfil) {
				value.delete = true;
				for ( j = 0; j < value.examenes.length; j++) {
					value2 = value.examenes[j];
					value2.estado = {};


					if (value2.usuario_muestra_id == null) {
						value2.estado.class = 'danger';
						value2.estado.texto = 'M Pendiente';
					}
					else {

						value.delete = false;
						if (value2.examen.examenes_parametros.length == $scope.countResultadosParametrosValidados(value2.resultados_examen))
						{
							value2.estado.class = 'primary';
							value2.estado.texto = 'Validado';
						}
						else
						if (value2.examen.examenes_parametros.length > $scope.countResultadosParametrosValidados(value2.resultados_examen))
						{
							value2.estado.class = 'warning';
							value2.estado.texto = 'Sin resultados';
						}
						else if(value2.examen.examenes_parametros.length == 0){
							value2.estado.class = 'danger';
							value2.estado.texto = 'Sin Parametros';
						}
						else{
							value2.estado.class = 'danger';
							value2.estado.texto = 'Error';
						}
					}
				}
			}
			else {
				value.delete = true;
				value.estado = {};

				if (value.usuario_muestra_id == null) {
					value.valido_impresion = false;
					value.estado.class = 'danger';
					value.estado.texto = 'M Pendiente';
				}
				else {
					if (value.examen.examenes_parametros.length == $scope.countResultadosParametrosValidados(value.resultados_examen)) {
						value.valido_impresion = true;
						value.delete = false;
						value.estado.texto = 'Validado';
						value.estado.class = 'primary';
					}
					else
					if (value.examen.examenes_parametros.length > $scope.countResultadosParametrosValidados(value.resultados_examen	)) {
						value.valido_impresion = false;
						value.delete = false;
						value.estado.texto = 'Sin resultados';
						value.estado.class = 'warning';
					}
					else if(value2.examen.examenes_parametros.length == 0){
						value.valido_impresion = false;
						value.estado.class = 'danger';
						value.estado.texto = 'Sin Parametros';
					}
					else
					{
						value.valido_impresion = false;
						value.estado.class = 'danger';
						value.estado.texto = 'Error';
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
		$scope.setEstadoExamenes();
	};

	$scope.detallePagos = [];
	$scope.nuevoPago = {};

	$scope.getTotalPagos = function() {
		var bonos = 0;
		var boletas = 0;
		var i = 0;
		while (i < $scope.detallePagos.length) {
			if($scope.detallePagos[i].tipo_pago_id == 1 || $scope.detallePagos[i].tipo_pago_id == 6 )
			{
				bonos = bonos + $scope.detallePagos[i].monto_pagado; 
			}
			else
			{
				boletas = boletas + $scope.detallePagos[i].monto_pagado; 
			}
			i++;
		}
		$scope.total_pagos_boletas = boletas;
		$scope.total_pagos_bonos = bonos;
		return bonos + boletas;
	}

	Fichas.id.getPagosRealizados({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		$scope.detallePagos = result.data;
		$scope.total_pagos = $scope.getTotalPagos();
		$scope.loading = false;
	}).catch(function(response) {
		console.error('ERROR al cargar detalle pagos');
	});

	$scope.limpiarTarifas = function() {
		//De examenes ya seleccionados al cargar ficha
		//Calcular los precios a pagar de acuerdo a la previsión seleccionada 
		//Precio copago = precio - precio_fonasa
		//Precio es el precio completo del examen, lo que se cobra en caso de que sea particular.
		//Para las tarifas de la prevision "Sin prevision" los precio_fonasa DEBEN ser 0 o NULL
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var temp1 = $scope.examenesSeleccionados_edit[i];
			if (!temp1.perfil)
			{
				var temp3 = temp1.examen?temp1.examen:temp1;
				var temp = null;
				//Revisar todas las tarifas para ver cual calza con esta prevision.
				for (var j = 0; j < temp3.tarifas_examen.length; j++) {
					var value = temp3.tarifas_examen[j];
					if (value.tarifa_id == $scope.ficha_edit.prevision.tarifa_id) {
						//Prevision calza
						temp3.tarifa_prevision = angular.copy(value);
						if(value.precio_fonasa && value.precio_fonasa != 0)
						{
							//precio fonasa es distinto de 0, por lo que el copago es = precio - precio_fonasa
							temp1.copago = value.precio - value.precio_fonasa;
							temp1.tipo_pago = 'IS';
							if($scope.ficha_edit.prevision.tarifa_id == 11)
								temp1.tipo_pago = 'FF';

						}
						else{
							temp1.precio_particular = value.precio;
							temp1.tipo_pago = 'PP';
						}
						temp1.precio = value.precio;
						if(temp1.precio == 0)temp1.tipo_pago = 'SC';
						break;
					}
					else
					{
						//No existe una tarifa que tenga relacion con esta prevision
						temp1.tipo_pago = 'NO';
						temp3.tarifa_prevision = null;
						temp1.precio = 0;
						temp1.precio_particular = null;
						temp1.copago = null;
					}
				}
			}
			else
			{
				for (var i = 0; i < temp1.examenes.length; i++)
				{
					var detalle = temp1.examenes[i];
					var temp = null;
					var value = detalle.examen?detalle.examen:detalle;
					for (var j = 0; j < value.tarifas_examen.length; j++) {
						var value2 = value.tarifas_examen[j];
						if (value2.tarifa_id == $scope.ficha_edit.prevision.tarifa_id)
						{
							value.tarifa_prevision = angular.copy(value2);
							if(value2.precio_fonasa && value2.precio_fonasa != 0)
							{
								//precio fonasa es distinto de 0, por lo que el copago es = precio - precio_fonasa
								value.copago = value2.precio - value2.precio_fonasa;
								value.tipo_pago = 'IS';
								if($scope.ficha_edit.prevision.tarifa_id == 11)
									value.tipo_pago = 'FF';
							}
							else
							{
								value.precio_particular = value2.precio;
								value.tipo_pago = 'PP';
								
							}
							value.precio = value2.precio;
							if(value.precio == 0)value.tipo_pago = 'SC';
							break;
						}
						else
						{
							temp1.tipo_pago = 'NO';
							value.tarifa_prevision = null;
							value.precio = 0;
							value.copago = null;
							value.precio_particular = null;
						}
					}
				}
			}
		}
		$scope.getPrecioTotal(true);
	}		

	$scope.getPrecioTotal = function(edit) {
		var total = 0;
		var copago = 0;
		var precio_particular = 0;
		var examenes = [];
		if (edit) {
			examenes = $scope.examenesSeleccionados_edit;
		}
		else {
			examenes = $scope.examenesSeleccionados;
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
					if (examen.tarifa_prevision != null && examen.tarifa_prevision != null) {
						var precio_particular_temp = examen.precio_particular?examen.precio_particular:0;
						var copago_temp = examen.copago?examen.copago:0;
						total = total + examen.precio;
						copago = copago + copago_temp;
						precio_particular = precio_particular + precio_particular_temp;
					}
				}
			}
			else {
				if (examenes[i].examen.tarifa_prevision) {
					var precio_particular_temp = examenes[i].precio_particular?examenes[i].precio_particular:0;
					var copago_temp = examenes[i].copago?examenes[i].copago:0;
					total = total + examenes[i].precio;
					copago = copago + copago_temp;
					precio_particular = precio_particular + precio_particular_temp;
				}
			}
		}
		if (edit) {
			$scope.precio_total_edit = total;
			$scope.copago_total_edit = copago;
			$scope.precio_particular_total_edit = precio_particular;
		}
		else {
			$scope.precio_total = total;
			$scope.copago_total = copago;
			$scope.precio_particular_total = precio_particular;
		}
	}
	
	$scope.cancelar_cambios = function() {
		$scope.prevision = $scope.setPrevisionSeleccionada($scope.ficha.prevision);
		$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
		$scope.ordenarExamenes();
		$scope.limpiarTarifas();
		$scope.examenesBorrados = [];
		$scope.examenesAgregados = [];
		$scope.ficha_edit.examenesAgregados = $scope.examenesAgregados;
		$scope.ficha_edit.examenesBorrados = $scope.examenesBorrados;
		$scope.ficha_edit = angular.copy($scope.ficha);
		$scope.precio_total_edit = angular.copy($scope.precio_total);
	}

	$scope.guardar_cambios_ficha = function(ficha_form) {
		if ($scope.validate_form(ficha_form)) {

			if ($scope.ficha_edit.medico != undefined) {
				$scope.ficha_edit.medico_id = $scope.ficha_edit.medico.id;
			}
			else {
				$scope.ficha_edit.medico_id = null;
			}
			$scope.ficha_edit.precio_total = $scope.precio_total_edit;
			if ($scope.ficha_edit.procedencia != undefined) {
				$scope.ficha_edit.procedencia_id = $scope.ficha_edit.procedencia.id;
			}
			$scope.ficha_edit.examenesAgregados = $scope.examenesAgregados;
			$scope.ficha_edit.examenesBorrados = $scope.examenesBorrados;
			$scope.ficha_edit.detalles_ficha = null;
			Ficha.update({
				id : $scope.ficha.id
			}, $scope.ficha_edit).$promise.then(function(response) {
				$scope.guardado = true;
				ficha_form.$setPristine();
				$scope.examenesSeleccionados = [];
				$scope.examenesSeleccionados_edit = [];
				$scope.examenesAgregados = [];
				$scope.examenesBorrados = [];
				$scope.ficha = response.data;
				$scope.setPaciente($scope.ficha);
	            $scope.ficha.numero_programa = parseInt($scope.ficha.numero_programa, 10);
				$scope.precio_total = angular.copy($scope.precio_total_edit);
				$scope.ordenarExamenes();
				$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
				$scope.limpiarTarifas();
				$scope.$emit('showGlobalAlert', {boldMessage: 'Editar Ficha', message: 'Cambios guardados satisfactoriamente.',class: 'alert-success'});

			}, function(response) {
				$scope.$emit('showGlobalAlert', {boldMessage: 'Editar Ficha',message: 'Problemas al guardar ficha. Deshaciendo los cambios realizados.',class: 'alert-danger'});
				$scope.cancelar_cambios();
				console.error('ERROR guardando cambios en ficha');
			});
		}
	}
	
	$scope.borrarMedico = function() {
		$scope.ficha_edit.medico = null;
		$scope.ficha_edit.medico_id = null;
	};
	
	$scope.crearMedico = function() {
		var modal = ngDialog.open({
			className: 'ngdialog-theme-laboratorios',
			template: "create_medico.html",
			scope: $scope
		});
	};
	
	$scope.editarMedico = function(medico) {
		$scope.medico_edit = medico;
		$scope.medico_edit.rut_completo = $scope.medico_edit.rut + "" + $scope.medico_edit.rutdv;
		var modal = ngDialog.open({
			className: 'ngdialog-theme-laboratorios',
			template: "editar_medico.html",
			scope: $scope
		});
	};
	
	$scope.editar_medico = function(data){
		if(data.rut_completo != null){
			data.rut = parseInt(data.rut_completo / 10);
			data.rutdv = parseInt(data.rut_completo % 10);
			if(data.especialidad)
				data.especialidad_id = data.especialidad.id;
			else
				data.especialidad_id = null;
			if(data.institucion)
				data.institucion_id = data.institucion.id;
			else
				data.institucion_id = null;
			
			Medico.update({id:data.id}, data).$promise.then(function(response) {
				$scope.$emit('showGlobalAlert', {boldMessage: 'Médico editado', message: 'Medico editado satisfactoriamente.',class: 'alert-success'});
				
			}, function(response) {
				$scope.$emit('showGlobalAlert', {boldMessage: 'Médico editado', message: 'Modificación fallida.',class: 'alert-danger'});
				console.log("ERROR editando medico");
			});
		}
		ngDialog.closeAll();
	};
	
	$scope.guardar_medico = function(medico_form, data){
		if(medico_form.$valid)
		{
			if(data.rut_completo != null){
				
				data.rut = parseInt(data.rut_completo / 10);
				data.rutdv = parseInt(data.rut_completo % 10);
				if(data.especialidad)
					data.especialidad_id = data.especialidad.id;
				else
					data.especialidad_id = null;
				if(data.institucion)
					data.institucion_id = data.institucion.id;
				else
					data.institucion_id = null;
				Medico.new(data).$promise.then(function(response) {
					$scope.$emit('showGlobalAlert', {boldMessage: 'Nuevo médico', message: 'Medico creado satisfactoriamente.',class: 'alert-success'});
					var medico_creado = response.data;
					medicosService.addMedico(medico_creado );
					$scope.ficha_edit.medico = medico_creado ;
					$scope.ficha_edit.medico_id = medico_creado .id;
				}, function(response) {
					$scope.$emit('showGlobalAlert', {boldMessage: 'Nuevo médico', message: 'Creación de médico fallida.',class: 'alert-danger'});
					console.log("ERROR creando medico");
				});
			}
			ngDialog.closeAll();
		}	
	};
	
	$scope.validate_form = function(ficha_form) {
		var mensaje = '<ul>';
		if(!ficha_form.$valid)
			mensaje = mensaje + '<li>Debe completar la información mínima</li>';
		if($scope.examenesSeleccionados_edit.length == 0)
			mensaje = mensaje + '<li>Debe agregar un examen</li>';
		mensaje = mensaje + '</ul>';

		if($scope.examenesSeleccionados_edit.length > 0 && ficha_form.$valid)
		{
			return true;
		}
		else
		{
			$scope.$emit('showGlobalAlert', {boldMessage: 'Editar Ficha',message: mensaje,class: 'alert-danger'});
			return false;
		}
	}

	$scope.getInfoPaciente = function(ficha)
	{
		var paciente = ficha.paciente;
		var paciente_info = [];
		paciente_info.push([{ text: 'Rut', bold: true},paciente.rut_completo]);
		paciente_info.push([{ text: 'Paciente', bold: true},paciente.nombre +' '+ paciente.apellido_paterno]);
		paciente_info.push([{ text: 'Genero', bold: true},paciente.genero?'Masculino':'Femenino']);
		paciente_info.push([{ text: 'Fecha nacimiento', bold: true},paciente.getFormatedBirth()+ ' - '+ paciente.getEdad()]);
		if(paciente.telefono)paciente_info.push([{ text: 'Teléfono', bold: true},paciente.telefono]);
		if(paciente.celular)paciente_info.push([{ text: 'Celular', bold: true},paciente.celular]);
		paciente_info.push([{ text: 'Prevision', bold: true},ficha.prevision.nombre]);
		if(paciente.email)paciente_info.push([{ text: 'Email', bold: true},paciente.email]);

		return {
			table:{
				body: paciente_info
			},
			style: 'normal',
			layout: 'noBorders'
		};
	}

	$scope.getInfoFicha = function(ficha)
	{
		var ficha_info = [];
		var row = [];
		
		ficha.creado = new Date(ficha.creado);
		var day = ficha.creado.getUTCDate();
    	if(day<10)day = '0'+day;
    	var month = ficha.creado.getUTCMonth()+1;
    	if (month< 10 )month = '0'+month;
    	day = day+'/'+month+'/'+ficha.creado.getFullYear();

		row.push({text: 'Ficha N°', bold: true});
		row.push({text: ficha.id?ficha.id+'':'NULO'});
		row.push({text: 'Fecha', bold: true});
    	row.push({text: day});
    	ficha_info.push(row);
		row = [];
		row.push({text: 'Recepcionista', bold: true});
		row.push({colSpan: 3, text: ficha.user.nombre +' '+ficha.user.apellido_paterno});
		ficha_info.push(row);
		row = [];
		row.push({text: 'Procedencia', bold: true});
		row.push({text: ficha.procedencia.nombre});
		row.push({text: 'Folio Proc.', bold: true});
		row.push({text: ficha.numero_procedencia?ficha.numero_procedencia:'NULO'});
		ficha_info.push(row);
		row = [];
		row.push({text: 'Programa', bold: true});
		row.push({text: ficha.programa});
		row.push({text: 'N° Prog', bold: true});
		row.push({text: ficha.numero_programa});
		ficha_info.push(row);
		row = [];
		if(ficha.medico_id != null)
		{
			row.push({text: 'Médico', bold: true});
			row.push({colSpan: 3, text: ficha.medico.nombre+ ' '+ficha.medico.apellido_paterno+' '+ficha.medico.apellido_materno});
			ficha_info.push(row);
			row=[];
		}
		if(ficha.observaciones != null)
		{
			row.push({text: 'Observaciones', bold: true});
			row.push({colSpan: 3, text: ficha.observaciones});
			ficha_info.push(row);
			row=[];
		}

		return {
			table: {
				body: ficha_info
			},
			style: 'normal',
			layout: 'noBorders'
		};
	}

	$scope.getHeaderLaboratorio = function(){
		return {
			columns: [
				{
					table: {
						body: [
							[
								{
							     	image: 'data:image/jpeg;base64,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',
							      	fit: [50, 50]
							    },
						        { text: 'Laboratorios sin nombre', bold: true},
						    ]
					    ]
					},
					layout: 'noBorders'
				},
				{
					stack: [
			            { text: 'calle falsa 123'},
			            { text: 'Telefonos: 569123988 - 569123956'}
	  				],
					alignment: 'right' 
				}
			],
			margin: [50,20,50,30],
			style: 'small'
		}
	}

	$scope.getTableExamenes = function(ficha, examenes_array){
		var tabla_examenes = [];
		var row = [];

		for (var i = 0; i < examenes_array.length; i++)
		{
			var value = examenes_array[i];
			var row2 = [];
			var resultados_examen = [[
				{text: 'Parametro', bold: true }, 
				{text: 'Resultado', bold: true },
				{text: 'Unidad', bold: true },
				{text: 'Valor de referencia', bold: true },
				{text: 'Método', bold: true }]];

			row.push({text: value.examen_id+''});
			row.push({text: value.examen.nombre, bold:true});
			tabla_examenes.push(row);
			row = [];
			for (var j = 0; j < value.resultados_examen.length; j++) {
				var result = value.resultados_examen[j];
				var result_row = [];
				result_row.push({text: result.examen_parametro.nombre});
				result_row.push({text: result.cantidad});
				result_row.push({text: result.examen_parametro.unidad_medida});
				result_row.push({text: ''});
				result_row.push({text: ''});
				resultados_examen.push(result_row);
			};
			row.push('');
			row.push({
				table: {
					headerRows: 1,
					widths: ['*','*','*','*','*'],
					body: resultados_examen
			},
			margin: [0,10,0,5],
			layout: 'noBorders'
			});
			tabla_examenes.push(row);
			row = [];
			
		};
		return {
			table:{
				widths: [30, '*'],
				body: tabla_examenes
			},
			margin: [0,20,0,10], style: 'normal',
			layout: 'noBorders'
		};
	}

	$scope.volver = function(){
		window.history.back();
	};
	
	$scope.getPDF = function(){
		var examenes_checked = [];
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var value = $scope.examenesSeleccionados_edit[i];
			if (value.checked)
			{
				examenes_checked.push(value);
			}
		};
		if(examenes_checked.length == 0)
		{
			$scope.$emit('showGlobalAlert', {boldMessage: 'Impresion de ficha',message: 'Debe seleccionar al menos un examen para imprimir.',class: 'alert-info'});
			return false;
		}
		else
		{
			var docDefinition = {
				pageMargins: [50, 100, 50, 50],
	            //pageOrientation: 'landscape',
	            header: $scope.getHeaderLaboratorio(),
	            footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
				content: [
					{
						columns: [$scope.getInfoPaciente($scope.ficha),$scope.getInfoFicha($scope.ficha)]
					},
					$scope.getTableExamenes($scope.ficha, examenes_checked)
				],				
				styles: {
					small: {
						fontSize: 9
					},
					normal: {
						fontSize: 11
					}
				}
			};
			pdfMake.createPdf(docDefinition).open();
			//pdfMake.createPdf(docDefinition).print();
			//pdfMake.createPdf(docDefinition).download('optionalName.pdf');
		}
	}

	$scope.moreMedicos = function()
	{
		$scope.limit  += 100;
		$scope.medicosFiltered = $filter('medicoFilter')($scope.medicosArray, $scope.ficha_edit.medico_input);
		$scope.medicosFiltered = $filter('limitTo')($scope.medicosArray, $scope.limit);		
	}

	// watch medicosArray
	// watch medico_input
	$scope.$watch('medicosArray',function(newQuery,oldQuery){
		$scope.medicosFiltered = $filter('medicoFilter')(newQuery, $scope.ficha_edit.medico_input);
		$scope.medicosFiltered = $filter('limitTo')(newQuery, $scope.limit);
	});
	$scope.$watch('ficha_edit.medico_input',function(newQuery,oldQuery){
		$scope.medicosFiltered = $filter('medicoFilter')($scope.medicosArray, newQuery);
		$scope.medicosFiltered = $filter('limitTo')($scope.medicosArray, $scope.limit);	
	});

	$scope.$watch('medicosFiltered',function(newQuery,oldQuery){
		console.log('medicosFiltered');
		for (var i = newQuery.length - 1; i >= 0; i--) {
			var medicoFiltrado = newQuery[i];
			if (medicoFiltrado.apellido_paterno.length > $scope.medicoDisplayStyle.apellido_paterno) $scope.medicoDisplayStyle.apellido_paterno = medicoFiltrado.apellido_paterno.length;
			if (medicoFiltrado.apellido_materno && medicoFiltrado.apellido_materno.length > $scope.medicoDisplayStyle.apellido_materno) $scope.medicoDisplayStyle.apellido_materno = medicoFiltrado.apellido_materno.length;
			if (medicoFiltrado.nombre.length > $scope.medicoDisplayStyle.nombre) $scope.medicoDisplayStyle.nombre = medicoFiltrado.nombre.length;
			if (medicoFiltrado.especialidad && medicoFiltrado.especialidad.nombre.length > $scope.medicoDisplayStyle.especialidad) $scope.medicoDisplayStyle.especialidad = medicoFiltrado.especialidad.nombre.length;
		};

		var ratio = 2;

		$scope.medicoDisplayStyle.apellido_paterno_style = 'display: inline-block; width: '+$scope.medicoDisplayStyle.apellido_paterno/ratio+'em;';
		$scope.medicoDisplayStyle.apellido_materno_style = 'display: inline-block; width: '+$scope.medicoDisplayStyle.apellido_materno/ratio+'em;';
		$scope.medicoDisplayStyle.nombre_style = 'display: inline-block; width: '+$scope.medicoDisplayStyle.nombre/ratio+'em;';
		$scope.medicoDisplayStyle.especialidad_style = 'display: inline-block; width: '+$scope.medicoDisplayStyle.especialidad/ratio+'em;';
	});

});

/*
 

	console.log($scope.medicosArray);
			$scope.medicosFiltered = $filter('medicoFilter')($scope.medicosArray, $scope.ficha_edit.medico_input);
			console.log($scope.medicosFiltered);
			$scope.medicosFiltered = $filter('limitTo')($scope.medicosArray, $scope.limit);
			console.log($scope.medicosFiltered);
	$scope.medicosFiltered = [];
	$scope.$scope.medicoDisplayStyle = {
		apellido_paterno : 0,
		apellido_materno : 0,
		nombre : 0,
		especialidad : 0,
		apellido_paterno_style : 'display: inline-block; width: 6ex;',
		apellido_materno_style : 'display: inline-block; width: 6ex;',
		nombre_style : 'display: inline-block; width: 6ex;',
		especialidad_style : 'display: inline-block; width: 6ex;'
	};*/