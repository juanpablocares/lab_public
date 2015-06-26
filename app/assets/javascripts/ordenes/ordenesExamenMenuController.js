angular.module('lab').controller('OrdenesExamenMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	if ($stateParams.ficha_id == null){
		console.log('Ficha id null');
		$state.go('loginRequired.busqueda_examenes');
	}

	$scope.tabs = [{
		name : 'Información',
		state : 'loginRequired.ordenes_examen.info',
		id : 'loginRequired.ordenes_examen.info',
	}, {
		name : 'Ingreso',
		state : 'loginRequired.ordenes_examen.ingreso_resultados',
		id : 'loginRequired.ordenes_examen.ingreso_resultados',
	}];

	$scope.setEstadoExamen = function() {
		value = $scope.detalleFicha;
		value.estado = {};
		if (value.usuario_muestra_id == null) {
			value.estado.class = 'warning';
			value.estado.texto = 'Toma de muestra pendiente';
		}
		else {
			if (value.resultados_examen.length == value.examen.sustancias.length) {
				value.estado.texto = 'Resultados ingresados';
				value.estado.class = 'info';
			}
			else
			if (value.resultados_examen.length < value.examen.sustancias.length || value.examen.sustancias.length == 0) {
				value.estado.class = 'success';
				value.estado.texto = 'Toma de muestra realizada';
			}
			else {
				value.estado.class = 'danger';
				value.estado.texto = 'Error en resultados';
			}
		}
	};

	/*DetalleFicha.get({
		id : $stateParams.detalle_ficha_id
	}, function(result) {
		$scope.detalleFicha = result.data;
		$scope.detalleFicha.ficha.paciente.fecha_nacimiento = new Date($scope.detalleFicha.ficha.paciente.fecha_nacimiento);
		$scope.detalleFicha.ficha.paciente.fecha_nacimiento = new Date($scope.detalleFicha.ficha.paciente.fecha_nacimiento.getUTCFullYear(), $scope.detalleFicha.ficha.paciente.fecha_nacimiento.getUTCMonth(), $scope.detalleFicha.ficha.paciente.fecha_nacimiento.getUTCDate());
		$scope.detalleFicha.ficha.paciente.edad = $scope.getEdad($scope.detalleFicha.ficha.paciente.fecha_nacimiento);
		$scope.setEstadoExamen();
		$scope.mandarDetalleFicha();
	});*/
	
	/*$scope.$on('detalleFichaFromEdit', function(event, data) {
		$scope.detalleFicha = data;
	});

	$scope.$on('PedirDetalleFichaFromMenu', function(event, data) {
		$scope.mandarDetalleFicha();
	});
	*/
}); 