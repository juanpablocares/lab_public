angular.module('lab').controller('OrdenesExamenMenuController', function($scope, $http, $stateParams, $auth, $state, DetalleFicha) {

	if ($stateParams.detalle_ficha_id == null)
		$state.go('loginRequired.busqueda_examenes');
	$scope.state = $state;

	$scope.tabs = [{
		name : 'Información',
		state : 'loginRequired.ordenes_examen.info()',
		id : 'loginRequired.ordenes_examen.info',
	}, {
		name : 'Resultados',
		state : 'loginRequired.ordenes_examen.resultados()',
		id : 'loginRequired.ordenes_examen.resultados',
	}, {
		name : 'Ingreso',
		state : 'loginRequired.ordenes_examen.ingreso_resultados()',
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

	$scope.getEdad = function(data) {
		if (data != null) {
			data = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate());

			var d = new Date();
			var meses = 0;
			if (data.getUTCMonth() - d.getMonth() > 0)
				meses += 12 - data.getUTCMonth() + d.getMonth();
			else
				meses = Math.abs(data.getUTCMonth() - d.getMonth());
			var nac = new Date(data);
			var birthday = +new Date(data);
			var anios = ((Date.now() - birthday) / (31556926000));
			return ~~anios + " Años " + ~~meses + " meses";
		}
	};

	DetalleFicha.get({
		id : $stateParams.detalle_ficha_id
	}, function(result) {
		$scope.detalleFicha = result.data;
		$scope.detalleFicha.ficha.paciente.fecha_nacimiento = new Date($scope.detalleFicha.ficha.paciente.fecha_nacimiento);
		$scope.detalleFicha.ficha.paciente.fecha_nacimiento = new Date($scope.detalleFicha.ficha.paciente.fecha_nacimiento.getUTCFullYear(), $scope.detalleFicha.ficha.paciente.fecha_nacimiento.getUTCMonth(), $scope.detalleFicha.ficha.paciente.fecha_nacimiento.getUTCDate());
		$scope.detalleFicha.ficha.paciente.edad = $scope.getEdad($scope.detalleFicha.ficha.paciente.fecha_nacimiento);
		$scope.setEstadoExamen();
		$scope.mandarDetalleFicha();
	});
	$scope.$on('detalleFichaFromEdit', function(event, data) {
		$scope.detalleFicha = data;
	});

	$scope.$on('PedirDetalleFichaFromMenu', function(event, data) {
		$scope.mandarDetalleFicha();
	});

	$scope.mandarDetalleFicha = function() {
		console.log("Mandar DetalleFicha desde menu");
		$scope.$broadcast('detalleFichaFromMenu', $scope.detalleFicha);
	}
}); 