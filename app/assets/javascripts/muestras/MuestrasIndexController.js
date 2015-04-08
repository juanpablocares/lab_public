angular.module('lab').controller('MuestrasIndexController', function($scope, $auth, $state, $http, $stateParams, Ficha) {

	/*$scope.$on('fichaFromMenu', function(event, data) {
		$scope.ficha = data;
		data.paciente.fecha_nacimiento = new Date(data.paciente.fecha_nacimiento);
		$scope.ficha.paciente.fecha_nacimiento =  new Date(data.paciente.fecha_nacimiento.getUTCFullYear(), data.paciente.fecha_nacimiento.getUTCMonth(), data.paciente.fecha_nacimiento.getUTCDate());
		$scope.ficha.paciente.edad = $scope.getEdad(data.paciente.fecha_nacimiento);
		console.log(data);
		$scope.masterFicha = angular.copy($scope.ficha);
		
	});*/

	//Obtener ficha buscada
	Ficha.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
			$scope.ficha = result.data;
			result.data.paciente.fecha_nacimiento = new Date(result.data.paciente.fecha_nacimiento);
			$scope.ficha.paciente.fecha_nacimiento =  new Date(result.data.paciente.fecha_nacimiento.getUTCFullYear(), result.data.paciente.fecha_nacimiento.getUTCMonth(), result.data.paciente.fecha_nacimiento.getUTCDate());
			$scope.ficha.paciente.edad = $scope.getEdad(result.data.paciente.fecha_nacimiento);
			$scope.masterFicha = angular.copy($scope.ficha);
	}).catch(function(response) {
		console.error('Error al obtener ficha');
		$state.go('loginRequired.index');
	});
	
	//Falta colocar info si se cambia de tab
	
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
	
	if ($stateParams.ficha != null) {
		$scope.ficha = $stateParams.ficha;
		$scope.masterFicha = angular.copy($scope.ficha);
	}
});
