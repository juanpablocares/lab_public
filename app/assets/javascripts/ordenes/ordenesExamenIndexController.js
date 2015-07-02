angular.module('lab').controller('OrdenesExamenIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas) {

	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');
	else{
		Fichas.input_resultados.get({
			id : $stateParams.ficha_id
		}, function(result) {
			$scope.ficha = result.data;
			$scope.ficha.paciente.edad = $scope.getEdad($scope.ficha.paciente.fecha_nacimiento);
			for(var i in $scope.ficha.detalles_ficha){
				for(var j in $scope.ficha.detalles_ficha[i].examen.examenes_parametros){
						for(var k in $scope.ficha.detalles_ficha[i].resultados_examen)
							if($scope.ficha.detalles_ficha[i].resultados_examen[k].examen_parametro_id == $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].id && $scope.ficha.detalles_ficha[i].estado != undefined && $scope.ficha.detalles_ficha[i].estado < 2){
								$scope.ficha.detalles_ficha[i].estado = 2;
							}
						if($scope.ficha.detalles_ficha[i].usuario_muestra != undefined && $scope.ficha.detalles_ficha[i].estado != undefined && $scope.ficha.detalles_ficha[i].estado < 1){
							$scope.ficha.detalles_ficha[i].estado = 1;
						}
						else{
							$scope.ficha.detalles_ficha[i].estado = 0;
						}
				}
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
});
