angular.module('lab').controller('MuestrasIndexController', function($scope, $auth, $state, $http, $stateParams, Ficha, Fichas, DetallesFicha, DetalleFicha) {
	
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

	//Obtener ficha buscada
	Ficha.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
			$scope.ficha = result.data;
			result.data.paciente.fecha_nacimiento = new Date(result.data.paciente.fecha_nacimiento);
			$scope.ficha.paciente.fecha_nacimiento =  new Date(result.data.paciente.fecha_nacimiento.getUTCFullYear(), result.data.paciente.fecha_nacimiento.getUTCMonth(), result.data.paciente.fecha_nacimiento.getUTCDate());
			$scope.ficha.paciente.edad = $scope.getEdad(result.data.paciente.fecha_nacimiento);
			$scope.masterFicha = angular.copy($scope.ficha);
			//console.log($scope.masterFicha);
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
	
	console.log("Muestra Examenes");
	$scope.$on('fichaFromMenu', function(event, data) {
		$scope.ficha = data;
		$scope.ficha.paciente.fecha_nacimiento = new Date($scope.ficha.paciente.fecha_nacimiento);
		$scope.ficha.paciente.fecha_nacimiento =  new Date($scope.ficha.paciente.fecha_nacimiento.getUTCFullYear(), $scope.ficha.paciente.fecha_nacimiento.getUTCMonth(), $scope.ficha.paciente.fecha_nacimiento.getUTCDate());
		$scope.ficha.paciente.edad = $scope.getEdad($scope.ficha.paciente.fecha_nacimiento);
		$scope.masterFicha = angular.copy($scope.ficha);
	});

	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	//Obtener ficha buscada
	Fichas.id.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		console.log("getficha");
		$scope.ficha = result.data;
		$scope.ordenarExamenes();
	}).catch(function(response) {
		$state.go('loginRequired.index');
	});

	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	
	$scope.cambiarEstadoBoton = function(item) {
		console.log("Definitivo");
		estado = item.estado;
		item.estado.class = 'info';
		item.estado.text = 'Cargando';

		DetalleFicha.get({
			id : item.id
		}).$promise.then(function(results) {
			tmp = results.data;

			if (tmp.usuario_muestra_id == null) {
				tmp.fecha_muestra = Date();
				tmp.usuario_muestra_id = $auth.user.id;
			}
			else {
				tmp.fecha_muestra = null;
				tmp.usuario_muestra_id = null;
			}

			DetallesFicha.id.update({
				id :  item.id
			}, tmp).$promise.then(function(results) {
				if (results.data.usuario_muestra_id != null) {
					item.estado.class = 'success';
					item.estado.text = 'Muestra realizada';
				}
				else {
					item.estado.class = 'warning';
					item.estado.text = 'Muestra pendiente';
				}
			}).catch(function(results) {
				item.estado = estado;
			});
		});
	}

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
						if (value2.usuario_muestra_id == null) {
							value2.estado = {};
							value2.estado.class = 'warning';
							value2.estado.text = 'Muestra pendiente';
						}
						else {
							value2.estado = {};
							value2.estado.class = 'success';
							value2.estado.text = 'Muestra realizada';
						}
						$scope.examenesSeleccionados.push(value2);
						if (value.id == value2.id)
							i--;
						$scope.ficha.detalles_ficha.splice(j, 1);
					}
					else
						j++;
				}
			}
			else {
				if (value.usuario_muestra_id == null) {
					value.estado = {};
					value.estado.class = 'warning';
					value.estado.text = 'Muestra pendiente';
				}
				else {
					value.estado = {};
					value.estado.class = 'success';
					value.estado.text = 'Muestra realizada';
				}
				//console.log(value);
				$scope.examenesSeleccionados.push(value);
			}
			i++;
		}
		console.log("Ordenar examenes");
		console.log($scope.examenesSeleccionados);
	};
	
	$scope.abrirFichaTecnica = function(examen_id){
            $window.open('www.aideas.cl:3000/#/ficha_tecnica/'+ examen_id, '_blank');
		console.log(examen_id);
	};
	
	$scope.cambiarVentanaSinCambios = function(){
		$state.go('loginRequired.busqueda_muestras');
	}
	
	$scope.actualizar_urgencia = function(detalle_ficha){
		console.log(detalle_ficha);
		DetallesFicha.id.update({
				id :  detalle_ficha.id
			}, detalle_ficha).$promise.then(function(results) {
				console.log('Modificada urgencia');
			}).catch(function(results) {
				
			});
	};
	
	$scope.guardarDatosMuestra = function(ficha) {
		console.log(ficha);
		Ficha.update({id:ficha.id}, ficha).
			$promise.
				then(function(response) {
					console.log(response.message);
				}, function(response) {
					console.log("ERROR editando ficha");
				});
	};
});