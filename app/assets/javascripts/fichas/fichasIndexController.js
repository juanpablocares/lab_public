angular.module('lab').controller('FichasIndexController', function(
	$scope, $auth, $state, $http, $stateParams, 
	Fichas, Previsiones, Perfiles, Medicos, 
	Procedencias, Examenes, DetallesPagoFicha, 
	Ficha) {

	//Esta vista tiene campos editables, con $scope.edit aviso a las vistas si mostrar algunos campos editables o fijos.
	$scope.edit = true;
	//$scope.saving es true para desactivar botones de save para evitar doble input. (creo que no verifica submit con teclado)
	$scope.saving = false;
	$scope.loading = true;
	$scope.guardado = false;
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
	$scope.precio_total_edit = 0;
	$scope.total_pagos = 0;
	$scope.total_pagos_bonos = 0;
	$scope.total_pagos_boletas = 0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	$scope.ficha_edit = {};
	$scope.examenesSeleccionados_edit = [];
	$scope.paciente = {};

	Ficha.get({
        id : $stateParams.ficha_id
		}, function(datos) {
	        $scope.ficha = datos.data;
	        $scope.setPaciente($scope.ficha);
            $scope.precio_total = $scope.precio_total_edit = $scope.ficha.precio_total;
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

			Previsiones.all.get().$promise.then(function(response) {
				$scope.previsionesArray = response.previsiones;
				$scope.prevision = $scope.setPrevisionSeleccionada($scope.ficha.prevision);
			}, function(response) {
				console.log("ERROR obteniendo previsiones");
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
		
			$scope.ficha_edit = angular.copy($scope.ficha);
			$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
			$scope.limpiarTarifas();
			$scope.getPDF();
	});
	
	$scope.setPaciente = function(ficha)
	{
		$scope.paciente = ficha.paciente;
        $scope.paciente.rut_completo = $scope.paciente.rut+""+$scope.paciente.rutdv;
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
        $scope.paciente.getFormatedBirth = function()
        {	
        	var day = $scope.paciente.fecha_nacimiento.getUTCDate();
        	if(day<10)day = "0"+day;
        	return day+"/"+($scope.paciente.fecha_nacimiento.getUTCMonth()+1)+"/"+$scope.paciente.fecha_nacimiento.getFullYear();
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

	$scope.setProcedenciaSeleccionada = function(ficha_procedencia) {
		for (var i = 0; i < $scope.procedenciasArray.length; i++) {
			var value = $scope.procedenciasArray[i];
			if (value.id == ficha_procedencia.id) {
				return value;
			}
		};
	};

	$scope.setPrevisionSeleccionada = function(prevision) {
		for (var i = 0; i < $scope.previsionesArray.length; i++) {
			var value = $scope.previsionesArray[i];
			if (value.id == prevision.id) {
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

	$scope.seleccionarPrevision = function(prevision)
	{
		//Se cambia la prevision. Debe cambiar en el registro del paciente, de la ficha
		//y actualizar los precios de los examenes realizados a la tarifa de la nueva prevision.
		$scope.ficha_edit.prevision = prevision;
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	}

	$scope.seleccionarExamen = function(model2, select) {

		var model = angular.copy(model2);
		select.selected = "";
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
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	};

	$scope.countResultadosParametrosValidados = function(resultados_examen)
	{
		console.log(resultados_examen);
		var count = 0;
		for (var i = 0; i < resultados_examen.length; i++)
		{
			var value = resultados_examen[i];
			console.log(value);
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
					value.estado.class = 'danger';
					value.estado.texto = 'M Pendiente';
				}
				else {
					if (value.examen.examenes_parametros.length == $scope.countResultadosParametrosValidados(value.resultados_examen)) {
						value.delete = false;
						value.estado.texto = 'Validado';
						value.estado.class = 'primary';
					}
					else
					if (value.examen.examenes_parametros.length > $scope.countResultadosParametrosValidados(value.resultados_examen	)) {
						value.delete = false;
						value.estado.texto = 'Sin resultados';
						value.estado.class = 'warning';
					}
					else if(value2.examen.examenes_parametros.length == 0){
						value.estado.class = 'danger';
						value.estado.texto = 'Sin Parametros';
					}
					else
					{
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
		console.error("ERROR al cargar detalle pagos");
	});

	$scope.limpiarTarifas = function() {
		console.log("limpiarTarifas");
		console.log($scope.examenesSeleccionados_edit);
		console.log($scope.ficha_edit.prevision);
		//De examenes ya seleccionados al cargar ficha
		for (var i = 0; i < $scope.examenesSeleccionados_edit.length; i++) {
			var temp1 = $scope.examenesSeleccionados_edit[i];
			if (!temp1.perfil)
			{
				var temp3 = temp1.examen;
				var temp = null;
				for (var j = 0; j < temp3.tarifas_examen.length; j++) {
					var value = temp3.tarifas_examen[j];
					if (value.tarifa_id == $scope.ficha_edit.prevision.tarifa_id) {
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
						if (value2.tarifa_id == $scope.ficha_edit.prevision.tarifa_id)
						{
							value.tarifa_prevision = angular.copy(value2);
							value.precio = value2.precio;
							break;
						}
						else
						{
							value.tarifa_prevision = null;
							value.precio = 0;
						}
					}
				}
			}
		}
		console.log("END limpiarTarifas");
	}		

	$scope.getPrecioTotal = function(edit) {
		console.log('Calculando nuevo precio');
		var total = 0;
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
		if (edit) {
			console.log("precio total edit = "+total);
			$scope.precio_total_edit = total;
		}
		else {
			$scope.precio_total = total;
		}
	}
	
	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.busqueda_fichas');

	$scope.cancelar_cambios = function() {
		$scope.examenesSeleccionados_edit = angular.copy($scope.examenesSeleccionados);
		$scope.ordenarExamenes();
		$scope.limpiarTarifas();
		$scope.ficha_edit = angular.copy($scope.ficha);
		$scope.precio_total_edit = angular.copy($scope.precio_total);
	}

	$scope.mostrarEnConsola = function(item){
		console.log(item);
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
			console.log("Antes de update");
			Ficha.update({
				id : $scope.ficha.id
			}, $scope.ficha_edit).$promise.then(function(response) {
				console.log("update correcto");
				console.log("prevision");
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

	

	$scope.getInfoPaciente = function(ficha)
	{
		var paciente = ficha.paciente;
		var paciente_info = [];
		paciente_info.push([{ text: 'Rut', bold: true},paciente.rut_completo]);
		paciente_info.push([{ text: 'Paciente', bold: true},paciente.nombre +" "+ paciente.apellido_paterno]);
		paciente_info.push([{ text: 'Genero', bold: true},paciente.genero?'Masculino':'Femenino']);
		paciente_info.push([{ text: 'Fecha nacimiento', bold: true},paciente.getFormatedBirth()+ " - "+ paciente.getEdad()]);
		if(paciente.telefono)paciente_info.push([{ text: 'Teléfono', bold: true},paciente.telefono]);
		if(paciente.celular)paciente_info.push([{ text: 'Celular', bold: true},paciente.celular]);
		paciente_info.push([{ text: 'Prevision', bold: true},ficha.prevision.nombre]);
		if(paciente.email)paciente_info.push([{ text: 'Email', bold: true},paciente.email]);

		return {
			table:{
				body: paciente_info
			},
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

    	if(ficha.urgente == true)
    	{
	    	row.push({colSpan: 4, text: "Ficha Urgente", bold: true},{},{},{});
			ficha_info.push(row);
			row=[];
		}
		
		row.push({text: 'Ficha N°', bold: true});
		row.push({text: ficha.id?ficha.id+"":"NULO"});
		row.push({text: 'Fecha', bold: true});
    	row.push({text: day});
    	ficha_info.push(row);
		row = [];
		row.push({text: 'Recepcionista', bold: true});
		row.push({colSpan: 3, text: ficha.user.nombre +" "+ficha.user.apellido_paterno});
		ficha_info.push(row);
		row = [];
		row.push({text: 'Procedencia', bold: true});
		row.push({text: ficha.procedencia.nombre});
		row.push({text: 'Folio Proc.', bold: true});
		row.push({text: ficha.numero_procedencia?ficha.numero_procedencia:"NULO"});
		ficha_info.push(row);
		row = [];
		row.push({text: "Programa", bold: true});
		row.push({text: ficha.programa});
		row.push({text: "N° Prog", bold: true});
		row.push({text: ficha.numero_programa});
		ficha_info.push(row);
		row = [];
		if(ficha.medico_id != null)
		{
			row.push({text: "Médico", bold: true});
			row.push({colSpan: 3, text: ficha.medico.nombre+ " "+ficha.medico.apellido_paterno+ " "+ficha.medico.apellido_materno});
			ficha_info.push(row);
			row=[];
		}
		if(ficha.observaciones != null)
		{
			row.push({text: "Observaciones", bold: true});
			row.push({colSpan: 3, text: ficha.observaciones});
			ficha_info.push(row);
			row=[];
		}

		return {
			table: {
				body: ficha_info
			},
			layout: 'noBorders'
		};
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

			row.push({text: value.examen_id+""});
			row.push({text: value.examen.nombre, bold:true});
			tabla_examenes.push(row);
			row = [];
			for (var i = 0; i < value.resultados_examen.length; i++) {
				var result = value.resultados_examen[i];
				var result_row = [];
				result_row.push({text: result.examen_parametro.nombre});
				result_row.push({text: result.cantidad});
				result_row.push({text: result.examen_parametro.unidad_medida});
				result_row.push({text: ''});
				result_row.push({text: ''});
				resultados_examen.push(result_row);
			};

			console.log(resultados_examen);
			row.push("");
			row.push({
				table: {
					headerRows: 1,
					body: resultados_examen
			}});
			tabla_examenes.push(row);
			row = [];
			
		};
		/*

		row.push({text: "N° Arancel", bold: true});
		row.push({text: ficha.prevision.tarifa_id+" "});
		row.push({text: "Precio Total", bold: true});
		row.push({text: $scope.precio_total_edit+" "});
		tabla_examenes.push(row);
		row = [];
		row.push({text: "Abonos bonos", bold: true});
		row.push({text: $scope.total_pagos_bonos});
		row.push({text: "Abonos boletas", bold: true});
		row.push({text: $scope.total_pagos_boletas});
		row.push({text: "Abonos boletas", bold: true});
		row.push({text: $scope.total_pagos});
		tabla_examenes.push(row);
		
		*/

		return {
			table:{
				widths: [30, '*'],
				body: tabla_examenes
			},
		};
	}

	$scope.getPDF = function(){
		var docDefinition = {
			pageMargins: [40, 40, 40, 40],
            pageOrientation: 'landscape',
			content: [
				{
					columns: [$scope.getInfoPaciente($scope.ficha),$scope.getInfoFicha($scope.ficha)]
				},
				$scope.getTableExamenes($scope.ficha, $scope.examenesSeleccionados_edit)
			],
			defaultStyle: {
				// alignment: 'justify'
			}
		};
		console.log(docDefinition);
		pdfMake.createPdf(docDefinition).open();
		//pdfMake.createPdf(docDefinition).print();
		//pdfMake.createPdf(docDefinition).download('optionalName.pdf');

	}
});
