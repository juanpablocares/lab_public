angular.module('lab').controller('PedirPasswordController', 
	function($scope, $auth, $state, $http, 
		$stateParams, Password) {

	$scope.errorMessage = false;
	$scope.password = '';

	$scope.validarPassword = function(pass){	
		event.preventDefault();
		Password.validarPassword({
			password: pass
		}).$promise.then(function(result){
			$state.go('loginRequired.muestras.info_password_validado');
		}).catch(function(response){
			$scope.password = '';
			$scope.errorMessage = true;
		});
	}
});

angular.module('lab').controller('MuestrasIndexController', 
	function($scope, $auth, $state, $http, 
		$stateParams, Ficha, Fichas, DetallesFicha, 
		ngDialog, Examen, DetalleFicha) {
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};

	$scope.showModal = function(examen_id)
	{
		Examen.get({
			id : examen_id
		}).$promise.then(function(result) {
				$scope.examen = result.examen;
				var modal = ngDialog.open({
					className: 'ngdialog-theme-laboratorios',
					template: "modal/modal_informacion_examen_toma_muestras.html",
					scope: $scope
				});
		}).catch(function(response) {
			console.error('Error al obtener examen');
			$state.go('loginRequired.index');
		});
		//console.log(modal);
		//console.log(examen_id);
	}


	$scope.getEdad = function(data) {
		if(data != null)
		{
			data = new Date(data.getUTCFullYear(), data.getUTCMonth(),data.getUTCDate());
			
			var d = new Date();
			var meses = 0;
			if(data.getUTCMonth() - d.getMonth() > 0)
				meses += 12 - data.getUTCMonth() + d.getMonth();
			else
				meses = Math.abs(data.getUTCMonth() - d.getMonth());
			var nac = new Date(data);
			var birthday = +new Date(data);
			var anios = ((Date.now() - birthday) / (31556926000));
			return ~~anios + " Años " + ~~meses + " meses";
		}
	};
	
	//console.log("Muestra Examenes");
	$scope.$on('fichaFromMenu', function(event, data) {
		$scope.ficha = data;
		$scope.ficha.paciente.fecha_nacimiento = new Date($scope.ficha.paciente.fecha_nacimiento);
		$scope.ficha.paciente.fecha_nacimiento =  new Date($scope.ficha.paciente.fecha_nacimiento.getUTCFullYear(), $scope.ficha.paciente.fecha_nacimiento.getUTCMonth(), $scope.ficha.paciente.fecha_nacimiento.getUTCDate());
		$scope.ficha.paciente.edad = $scope.getEdad($scope.ficha.paciente.fecha_nacimiento);
		$scope.masterFicha = angular.copy($scope.ficha);
	});

	//Obtener ficha buscada
	Ficha.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
			$scope.ficha = result.data;
			result.data.paciente.fecha_nacimiento = new Date(result.data.paciente.fecha_nacimiento);
			$scope.ficha.paciente.fecha_nacimiento =  new Date(result.data.paciente.fecha_nacimiento.getUTCFullYear(), result.data.paciente.fecha_nacimiento.getUTCMonth(), result.data.paciente.fecha_nacimiento.getUTCDate());
			$scope.ficha.paciente.edad = $scope.getEdad(result.data.paciente.fecha_nacimiento);
			$scope.masterFicha = angular.copy($scope.ficha);
			console.log('ordenar');
			$scope.ordenarExamenes();
	}).catch(function(response) {
		console.error('Error al obtener ficha');
		$state.go('loginRequired.index');
	});

	//console.log($scope.ficha);
	//Falta colocar info si se cambia de tab
	
	if ($stateParams.ficha != null) {
		$scope.ficha = $stateParams.ficha;
		$scope.ficha.paciente.edad = $scope.getEdad(ficha.paciente.fecha_nacimiento);
		$scope.masterFicha = angular.copy($scope.ficha);
	}

	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	
	$scope.cambiarEstadoBoton = function(item) {
		//console.log("Definitivo");
		estado = item.estado;
		item.estado.class = 'info';
		item.estado.text = 'Cargando';
		item.fecha = new Date();
		DetallesFicha.switch_muestra.put({
			id : item.id
		}).$promise.then(function(results) {
			detalle_ficha = results.data;
			if (detalle_ficha.usuario_muestra_id != null) {
				item.estado.class = 'success';
				item.estado.text = 'Muestra realizada';
				item.fecha_muestra = results.data.fecha_muestra;
				item.nombre_completo = detalle_ficha.usuario_muestra.nombre + " " + detalle_ficha.usuario_muestra.apellido_paterno;
			}
			else {
				item.estado.class = 'warning';
				item.estado.text = 'Muestra pendiente';
				item.nombre_completo = "";
				item.fecha_muestra = "";
		}}).catch(function(results) {
			console.log('Error cambiando el estado de la toma de muestra');
			item.estado = estado;
		});
	}

	$scope.ordenarExamenes = function() {
		var i = 0;
		console.log($scope.ficha.detalles_ficha);
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
						if (value2.usuario_muestra_id == null) {
							value2.estado = {};
							value2.estado.class = 'warning';
							value2.estado.text = 'Muestra pendiente';
							value2.nombre_completo = "";
						}
						else {
							value2.estado = {};
							value2.estado.class = 'success';
							value2.estado.text = 'Muestra realizada';
							value2.nombre_completo = value2.usuario_muestra.nombre + " " + value2.usuario_muestra.apellido_paterno;
						}

						if (value2.examen.codigo_fonasa.substr(2,2) != "07")
							$scope.examenesSeleccionados.push(value2);


						if (value.id == value2.id)
							i--;
						$scope.ficha.detalles_ficha.splice(j, 1);
					}
					else
						j++;

					$scope.ficha.detalles_ficha[j] = value2;
				}
			}
			else {
				if (value.usuario_muestra_id == null) {
					value.estado = {};
					value.estado.class = 'warning';
					value.estado.text = 'Muestra pendiente';
					value.nombre_completo = "";
				}
				else {
					value.estado = {};
					value.estado.class = 'success';
					value.estado.text = 'Muestra realizada';
					value.nombre_completo = value.usuario_muestra.nombre + " " + value.usuario_muestra.apellido_paterno;
				}
				//console.log(value);
				if (value.examen.codigo_fonasa.substr(2,2) != "07")
					$scope.examenesSeleccionados.push(value);
			}
			i++;
		}
		//console.log("Ordenar examenes");
		//console.log($scope.examenesSeleccionados);
	};
	
	$scope.cambiarVentanaSinCambios = function(){
		var fecha_local = new Date($scope.masterFicha.creado);
		var d = fecha_local.getDate();
		if(d < 10)
			d = '0' + d;
		var m = fecha_local.getMonth() + 1;
		if(m < 10)
			m = '0' + m;
		var y = fecha_local.getFullYear();
		fecha_local = d + '-' + m + '-' + y;
		$state.go('loginRequired.busqueda_muestras', {'fecha_anterior' : fecha_local});
	}
	
	$scope.actualizar_urgencia = function(detalle_ficha){
		//console.log(detalle_ficha);
		DetallesFicha.id.update({
				id :  detalle_ficha.id
			}, detalle_ficha).$promise.then(function(results) {
				console.log('Modificada urgencia');
			}).catch(function(results) {
				
			});
	};
	
	$scope.guardarDatosMuestra = function(ficha) {
		//console.log(ficha);
		Ficha.update({id:ficha.id}, ficha).
			$promise.
				then(function(response) {
					console.log(response.message);
				}, function(response) {
					console.log("ERROR editando ficha");
				});
	};

});


