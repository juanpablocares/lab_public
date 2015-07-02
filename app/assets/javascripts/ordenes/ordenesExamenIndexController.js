angular.module('lab').controller('OrdenesExamenIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas) {

	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');
	else{
		Fichas.input_resultados.get({
			id : $stateParams.ficha_id
		}, function(result) {
			$scope.ficha = result.data;
			console.log($scope.ficha);
			$scope.ficha.paciente.edad = $scope.getEdad($scope.ficha.paciente.fecha_nacimiento);
			for(var i in $scope.ficha.detalles_ficha){
				$scope.ficha.detalles_ficha[i].imprimir = true;
				$scope.ficha.detalles_ficha[i].estado = 0;
				if($scope.ficha.detalles_ficha[i].usuario_muestra_id != null){
					$scope.ficha.detalles_ficha[i].flebotomista = $scope.ficha.detalles_ficha[i].usuario_muestra.apellido_paterno + ', ' + $scope.ficha.detalles_ficha[i].usuario_muestra.nombre;
					$scope.ficha.detalles_ficha[i].estado = 1;
				}
				for(var j in $scope.ficha.detalles_ficha[i].examen.examenes_parametros){
					if($scope.ficha.detalles_ficha[i].resultados_examen.length == $scope.ficha.detalles_ficha[i].examen.examenes_parametros.length){
						$scope.ficha.detalles_ficha[i].estado = 2;
						$scope.ficha.detalles_ficha[i].imprimir = false;
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
