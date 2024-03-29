angular.module('lab').controller('MuestrasExamenesController', function($scope, $http, $stateParams, $auth, $state, $window, Fichas, DetallesFicha, DetalleFicha) {
	
	console.log("Muestra Examenes");
	$scope.$on('fichaFromMenu', function(event, data) {
		$scope.ficha = data;
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
					item.estado.text = 'Toma de muestra realizada';
				}
				else {
					item.estado.class = 'warning';
					item.estado.text = 'Toma de muestra pendiente';
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
							value2.estado.text = 'Toma de muestra pendiente';
						}
						else {
							value2.estado = {};
							value2.estado.class = 'success';
							value2.estado.text = 'Toma de muestra realizada';
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
					value.estado.text = 'Toma de muestra pendiente';
				}
				else {
					value.estado = {};
					value.estado.class = 'success';
					value.estado.text = 'Toma de muestra realizada';
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
});
