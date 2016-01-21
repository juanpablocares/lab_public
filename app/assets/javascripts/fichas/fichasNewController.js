/**
 * Controlador encargado de la creación de fichas clinicas y cotizaciones.
 */

/*
 Ejemplo de formato de Model "listado"

 Cada vez que en la vista se agreguen examenes, se agregarán de ésta forma al model "listado"
 y luego listado es lo que se enviará a la api, ademas de los datos del paciente

 */

angular.module('lab').controller('FichasNewController', function($scope, $auth, $state, $filter,
 $http, $resource, $stateParams, Previsiones, Examenes, Perfiles,
  Cotizaciones, Cotizacion, Procedencias, Ficha, Medicos, Medico, Institucion, ngDialog,
   Fichas, Medicos, medicosService, previsionesService, examenesService, procedenciasService, perfilesService) {

	$scope.edit = true;
	$scope.ficha = {};
	$scope.ficha_edit = {};
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

	$http.get('/api/pacientes/' + $stateParams.paciente_id).success(function(data) {
		//Set of received data to parent paciente object.
		$scope.paciente = data.data;
		$scope.ficha_edit.email = $scope.paciente.correo;	
		
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

		if(!medicosService.getMedicos())
		{
			Medicos.buscar.todos().$promise.then(function(data) {
				medicosService.setMedicos(data.data);
				$scope.medicosArray = medicosService.getMedicos();
				$scope.medico.selected = $scope.setMedicoSeleccionado($scope.ficha_edit.medico);
			}, function(response) {
				console.log("ERROR obteniendo medicos");
			});
		}
		else
		{
			$scope.medicosArray = medicosService.getMedicos();
			$scope.medico.selected = $scope.setMedicoSeleccionado($scope.ficha_edit.medico);
		}

		$scope.medicosFiltered = $filter('medicoFilter')($scope.medicosArray, $scope.ficha_edit.medico_input);
		$scope.medicosFiltered = $filter('limitTo')($scope.medicosArray, $scope.limit);

		if(!procedenciasService.getProcedencias())
		{
			Procedencias.buscar.todos().$promise.then(function(data) {
				procedenciasService.setProcedencias(data.data);
				$scope.procedenciasArray = procedenciasService.getProcedencias();
			}, function(data) {
				console.log('Error getting procedencias');
			});
		}
		else
		{
			$scope.procedenciasArray = procedenciasService.getProcedencias();
		}

		if(!examenesService.getExamenes())
		{
			Examenes.all.index({
			}).$promise.then(function(data) {
				examenesService.setExamenes(data.data);
				$scope.examenes = examenesService.getExamenes();
				$scope.crearExamenesArray();
			}, function(response) {
				console.log("ERROR obteniendo examenes");
			});
		}
		else
		{
			$scope.examenes = examenesService.getExamenes();
			$scope.crearExamenesArray();
		}

		if(!previsionesService.getPrevisiones())
		{
			Previsiones.all.get().$promise.then(function(data) {
				previsionesService.setPrevisiones(data.previsiones);
				$scope.previsionesArray = previsionesService.getPrevisiones();
				$scope.prevision.selected = $scope.setPrevisionSeleccionada($scope.paciente.prevision);
			}, function(data) {
				console.log('Error getting previsiones');
			});
		}
		else
		{
			$scope.previsionesArray = previsionesService.getPrevisiones();
			$scope.prevision.selected = $scope.setPrevisionSeleccionada($scope.paciente.prevision);
		}

		if(!perfilesService.getPerfiles())
		{
			Perfiles.buscar.todos().$promise.then(function(data) {
				perfilesService.setPerfiles(data.data);
				$scope.perfiles = perfilesService.getPerfiles();
				$scope.crearExamenesArray();
			}, function(data) {
				console.log('Error getting perfiles');
			});
		}
		else
		{
			$scope.perfiles = perfilesService.getPerfiles();
			$scope.crearExamenesArray();	
		}

	}).error(function(data) {
		$state.go('loginRequired.index');
	});

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

	$scope.seleccionarExamen = function(model2) {
		var model = angular.copy(model2);
		$scope.selectModel.selected = null;
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

	$scope.borrarMedico = function() {
		$scope.ficha_edit.medico = null;
		$scope.ficha_edit.medico_id = null;
		$scope.medico.selected = null;
	}

	$scope.seleccionarPrevision = function(prevision, select)
	{
		//Se cambia la prevision. Debe cambiar en el registro del paciente, de la ficha
		//y actualizar los precios de los examenes realizados a la tarifa de la nueva prevision.
		$scope.paciente.prevision = prevision;
		$scope.crearExamenesArray();
		$scope.limpiarTarifas();
		$scope.getPrecioTotal(true);
	}

	$scope.seleccionarMedico = function(model) {
		$scope.ficha_edit.medico = model;
		$scope.ficha_edit.medico_input = '';
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
			
			console.log(data);
			
			Medico.update({id:data.id}, data).$promise.then(function(response) {
				$scope.$emit('showGlobalAlert', {boldMessage: 'Médico editado', message: 'Medico editado satisfactoriamente.',class: 'alert-success'});
				
				for(var i = 0; i < $scope.medicosArray.length; i++)
					if($scope.medicosArray[i].id == data.id)
						$scope.medicosArray[i] = data;
				
			}, function(response) {
				$scope.$emit('showGlobalAlert', {boldMessage: 'Médico editado', message: 'Modificación fallida.',class: 'alert-danger'});
				console.log("ERROR editando medico");
			});
		}
		ngDialog.closeAll();
	};
	
	$scope.crearMedico = function() {
		var modal = ngDialog.open({
			className: 'ngdialog-theme-laboratorios',
			template: "create_medico.html",
			scope: $scope
		});
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
	
	$scope.crearInstitucion = function() {
		var modal = ngDialog.open({
			className: 'ngdialog-theme-laboratorios',
			template: "create_institucion.html",
			scope: $scope
		});
	};
	
	$scope.guardar_institucion = function(data) {
		
		Institucion.new(data).$promise.then(function(response) {
					$scope.$emit('showGlobalAlert', {boldMessage: 'Nueva institución', message: 'Institución creada satisfactoriamente.',class: 'alert-success'});
					$http.get('/api/instituciones').success(function(data) {
						$scope.instituciones = data.instituciones;
					}).error(function(data) {
						// log error
					});	

				}, function(response) {
					$scope.$emit('showGlobalAlert', {boldMessage: 'Nueva institución', message: 'Creación de institución fallida.',class: 'alert-danger'});
					console.log("ERROR creando institución");
				});
				
		ngDialog.closeThisDialog();
	}
	
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


	$scope.crearFicha = function(ficha_form) {
		if ($scope.validate_form(ficha_form)) {
			$scope.ficha_edit.paciente_id = $scope.paciente.id;
			console.log($scope.ficha_edit);
			if ($scope.medico != undefined) {
				$scope.ficha_edit.medico_id = $scope.ficha_edit.medico.id;
			}
			else {
				$scope.ficha_edit.medico_id = null;
			}
			$scope.ficha_edit.precio_total = $scope.precio_total_edit;

			$scope.ficha_edit.procedencia_id = $scope.ficha_edit.procedencia.id;
			$scope.ficha_edit.examenesAgregados = $scope.examenesAgregados;
			$scope.ficha_edit.prevision_id = $scope.prevision.selected.id;
			$scope.ficha_edit.detalles_ficha = null;
			console.log("Antes de update");
			Ficha.new($scope.ficha_edit).$promise.then(function(response) {
				$state.go('loginRequired.fichas.info', {
					ficha_id : response.data.id
				});
				//$scope.$emit('showGlobalAlert', {message: 'Ficha creada satisfactoriamente.',boldMessage: 'Ficha N° '+response.data.id ,class: 'alert-success'});
			}, function(response) {
				console.log("ERROR creando ficha");
				console.log(response);
			});
		}
	}
	
	$scope.crearCotizacion = function(ficha_form) {
		if ($scope.validate_form(ficha_form)) {
			$scope.ficha_edit.paciente_id = $scope.paciente.id;
			if ($scope.medico != undefined && $scope.medico.selected != undefined) {
				$scope.ficha_edit.medico_id = $scope.medico.selected.id;
			}
			else {
				$scope.ficha_edit.medico_id = null;
			}
			$scope.ficha_edit.precio_total = $scope.precio_total_edit;
			$scope.ficha_edit.procedencia_id = $scope.procedencia.selected.id;
			$scope.ficha_edit.examenesAgregados = $scope.examenesAgregados;
			$scope.ficha_edit.prevision_id = $scope.prevision.selected.id;
			$scope.ficha_edit.detalles_ficha = null;
			console.log("Antes de update");
			Cotizacion.new($scope.ficha_edit).$promise.then(function(response) {
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

