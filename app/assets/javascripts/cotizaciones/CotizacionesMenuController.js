angular.module('lab').controller('CotizacionesMenuController', function($scope, $http, $stateParams, $auth, $state, Cotizacion) {

	$scope.loading = true;

	if ($stateParams.cotizacion_id == null)
		$state.go('loginRequired.busqueda_cotizacion');
	$scope.state = $state;

	$scope.tabs = [{
		name : 'Información',
		state : 'loginRequired.cotizaciones.info()',
		id : 'loginRequired.cotizaciones.info',
	}];

	Cotizacion.get({
		id : $stateParams.cotizacion_id
	}, function(datos) {
		$scope.cotizacion = datos.data;
		$scope.cotizacion.paciente.fecha_nacimiento = new Date($scope.cotizacion.paciente.fecha_nacimiento);
		$scope.cotizacion.paciente.rut_completo = $scope.cotizacion.paciente.rut+""+$scope.cotizacion.paciente.rutdv;	
		$scope.cotizacion.paciente.getEdad = function() {
			
			if ($scope.cotizacion.paciente != null) {

				var d = new Date();
				var meses = 0;
				if ($scope.cotizacion.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth() > 0)
					meses += 12 - $scope.cotizacion.paciente.fecha_nacimiento.getUTCMonth() + d.getMonth();
				else
					meses = Math.abs($scope.cotizacion.paciente.fecha_nacimiento.getUTCMonth() - d.getMonth());
				var birthday = +new Date($scope.cotizacion.paciente.fecha_nacimiento);
				var anios = ((Date.now() - birthday) / (31556926000));
				return ~~anios + " Años " + ~~meses + " meses";
			}
		};
		
		$scope.mandarCotizacion();
		$scope.loading = false;
	});
	$scope.$on('cotizacionFromEdit', function(event, data) {
		$scope.cotizacion = data;
	});

	$scope.$on('PedirCotizacionFromMenu', function(event, data) {
		$scope.mandarFicha();
	});

	$scope.mandarCotizacion = function() {
		if($scope.cotizacion != null)
		{
			$scope.$broadcast('fichaFromMenu', $scope.cotizacion);
		}
	}
}); 
