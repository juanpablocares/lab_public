angular.module('lab').controller('OrdenesExamenIndexController', function($scope, $auth, $state, $http, $stateParams, Ficha) {

	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');
	else{
		Ficha.get({
			id : $stateParams.ficha_id
		}, function(result) {
			$scope.ficha = result.data;
			$scope.ficha.paciente.edad = $scope.getEdad($scope.ficha.paciente.fecha_nacimiento);
			for(var i in $scope.ficha.detalles_ficha){
				//El estado después se debe cambiar al valor real correspondiente
				$scope.ficha.detalles_ficha[i].estado = i;
				//console.log($scope.ficha.detalles_ficha[i].estado);
				if($scope.ficha.detalles_ficha[i].estado < 2)
					$scope.ficha.detalles_ficha[i].imprimir = true;
				else
					$scope.ficha.detalles_ficha[i].imprimir = false;
			}
		});
	}
	
	$scope.getEdad = function(data) {
		if (data != null) {
			data = new Date(data);
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
	
	$scope.estado_examen = function(examen){
		if(examen.usuario_muestra_id == null)
			return 0;
	};
	//$scope.$emit('PedirDetalleFichaFromMenu');
	
	

});
