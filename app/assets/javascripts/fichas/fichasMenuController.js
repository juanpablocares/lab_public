angular.module('lab').controller('FichasMenuController', function($scope, $http, $stateParams, $auth, $state, Ficha) {

	$scope.loading = true;

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
	}];
	
	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});
	
	Ficha.get({
		id : $stateParams.ficha_id
	}, function(datos) {
		$scope.ficha = datos.data;
		$scope.ficha.paciente.fecha_nacimiento = new Date($scope.ficha.paciente.fecha_nacimiento);
		$scope.ficha.paciente.rut_completo = $scope.ficha.paciente.rut+""+$scope.ficha.paciente.rutdv;	
		$scope.ficha.paciente.getEdad = function() {
			if ($scope.ficha.paciente != null) {
				var d = new Date();
				var meses = 0;
				if ($scope.ficha.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth() > 0)
					meses += 12 - $scope.ficha.paciente.fecha_nacimiento.getUTCMonth() + d.getMonth();
				else
					meses = Math.abs($scope.ficha.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth());
				var birthday = +new Date($scope.ficha.paciente.fecha_nacimiento);
				var anios = ((Date.now() - birthday) / (31556926000));
				return ~~anios + " Años " + ~~meses + " meses";
			}
		};
		console.log($scope.ficha);
		$scope.mandarFicha();
		$scope.loading = false;
	});
	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});

	$scope.$on('PedirFichaFromMenu', function(event, data) {
		$scope.mandarFicha();
	});

	$scope.mandarFicha = function() {
		if($scope.ficha != null)
		{
			$scope.$broadcast('fichaFromMenu', $scope.ficha);
		}
	}
}); 
