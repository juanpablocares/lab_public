angular.module('lab').controller('FichasMenuController', function($scope, $http, $stateParams, $auth, $state, Ficha) {

	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.busqueda_ficha');
	$scope.state = $state;

	$scope.tabs = [{
		name : 'Información',
		state : 'loginRequired.fichas.info()',
		id : 'loginRequired.fichas.info',
	}, {
		name : 'Pagos',
		state : 'loginRequired.fichas.pagos()',
		id : 'loginRequired.fichas.pagos',
	}, {
		name : 'Examenes',
		state : 'loginRequired.fichas.examenes()',
		id : 'loginRequired.fichas.examenes',
	}];

	Ficha.get({
		id : $stateParams.ficha_id
	}, function(datos) {
		$scope.ficha = datos.data;
		$scope.ficha.paciente.fecha_nacimiento = new Date($scope.ficha.paciente.fecha_nacimiento);
		$scope.ficha.paciente.rut_completo = $scope.ficha.paciente.rut+""+$scope.ficha.paciente.rutdv;	
		$scope.ficha.paciente.getEdad = function() {
			
			if ($scope.ficha.paciente != null) {
				$scope.ficha.paciente.fecha_nacimiento = new Date($scope.ficha.paciente.fecha_nacimiento.getUTCFullYear(), $scope.ficha.paciente.fecha_nacimiento.getUTCMonth(), $scope.ficha.paciente.fecha_nacimiento.getUTCDate());

				var d = new Date();
				var meses = 0;
				if ($scope.ficha.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth() > 0)
					meses += 12 - $scope.ficha.paciente.fecha_nacimiento.getUTCMonth() + d.getMonth();
				else
					meses = Math.abs($scope.ficha.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth());
				var nac = new Date($scope.ficha.paciente.fecha_nacimiento);
				var birthday = +new Date($scope.ficha.paciente.fecha_nacimiento);
				var anios = ((Date.now() - birthday) / (31556926000));
				return ~~anios + " Años " + ~~meses + " meses";
			}
		};
		
		$scope.mandarFicha();
	});
	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});

	$scope.$on('PedirFichaFromMenu', function(event, data) {
		$scope.mandarFicha();
	});

	$scope.mandarFicha = function() {
		$scope.$broadcast('fichaFromMenu', $scope.ficha);
	}
}); 
