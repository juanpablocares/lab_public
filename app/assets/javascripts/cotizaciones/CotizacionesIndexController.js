angular.module('lab').controller('CotizacionesIndexController', function($scope, $auth, $state, $http, $stateParams, Cotizaciones, Perfiles) {

	$scope.loading = true;
	$scope.precio_total = 0;
	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.cotizacion = {};

	$scope.setEstadoExamenes = function() {
		for ( i = 0; i < $scope.examenesSeleccionados.length; i++) {
			value = $scope.examenesSeleccionados[i];
			if (value.perfil) {
				value.delete = true;
				for ( j = 0; j < value.examenes.length; j++) {
					value2 = value.examenes[j];
					value2.estado = {};
					if (value2.usuario_muestra_id == null) {
						value2.estado.class = 'warning';
						value2.estado.texto = 'Pendiente';
					}
					else {
						if (value2.resultados_examen.length == value2.examen.sustancias.length) {
							value.delete = false;
							value2.estado.texto = 'Ingresado',
							value2.estado.class = 'success';
						}
						else
						if (value2.resultados_examen.length < value2.examen.sustancias.length || value2.examen.sustancias.length == 0) {
							value.delete = false;
							value2.estado.class = 'info';
							value2.estado.texto = 'Examen';
						}
						else {
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
					value.estado.class = 'warning';
					value.estado.texto = 'Pendiente';
				}
				else {
					if (value.resultados_examen.length == value.examen.sustancias.length) {
						value.delete = false;
						value.estado.texto = 'Ingresado',
						value.estado.class = 'success';
					}
					else
					if (value.resultados_examen.length < value.examen.sustancias.length || value.examen.sustancias.length == 0) {
						value.delete = false;
						value.estado.class = 'info';
						value.estado.texto = 'Examen';
					}
					else {
						value.estado.class = 'danger';
						value.estado.texto = 'Error';
					}
				}
			}
		}
	};

	//Sin cotizacion, enviar al home
	if ($stateParams.cotizacion_id == null)
		$state.go('loginRequired.index');

	$scope.ordenarExamenes = function(tarifa_id) {
		var i = 0;
		detalles = angular.copy($scope.cotizacion.detalles_cotizacion);

		while (i < detalles.length) {
			value = detalles[i];
			if (value.perfil_id != null) {
				//es perfil
				var perfilTemp = value.perfil;
				perfilTemp.detalles_cotizacion = [];
				perfilTemp.perfil = true;
				var j = 0;
				while (j < detalles.length) {
					value2 = detalles[j];
					if (value.perfil_id == value2.perfil_id) {
						perfilTemp.detalles_cotizacion.push(value2);
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
		$scope.precio_total = $scope.cotizacion.precio_total;
		$scope.setEstadoExamenes();
	};


	//Recobrar cotizacion desde el menu
	$scope.$on('cotizacionFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.cotizacion = data;
			$scope.ordenarExamenes();
		}
	});
	$scope.$emit('PedirCotizacionFromMenu');

});
