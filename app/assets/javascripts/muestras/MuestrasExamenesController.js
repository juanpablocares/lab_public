angular.module('lab').controller('MuestrasExamenesController', function($scope, $http, $stateParams, $auth, $state, Fichas, DetalleFicha) {
	$scope.$on('fichaFromMenu', function(event, data) {
		//console.log('fichaFromMenu');
		//console.log(data);
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
			$scope.ficha = result.data;
			$scope.ordenarExamenes();
			console.log($scope.examenesSeleccionados);
	}).catch(function(response) {
		console.error('Error al obtener ficha');
		$state.go('loginRequired.index');
	});
	
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};

	$scope.cambiarEstadoBoton = function(index, id){
		//console.log(id);
		
		$scope.examenesSeleccionados[index].success = !$scope.examenesSeleccionados[index].success;
		
		if($scope.examenesSeleccionados[index].success)
			$scope.examenesSeleccionados[index].estado = "Realizado";
		else
			$scope.examenesSeleccionados[index].estado = "Pendiente";
			
		DetalleFicha.get({
				id : id
			}).
			$promise.then(function(data) {
				tmp = data.detalle_ficha;
				if($scope.examenesSeleccionados[index].success){
					tmp.fecha_muestra = Date();
					tmp.usuario_muestra_id = $auth.user.id;
				}
				else{
					tmp.fecha_muestra = null;
					tmp.usuario_muestra_id = null;
				}
				
				console.log(tmp);
				DetalleFicha.update({id:id}, tmp);
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
						//console.log(value2);
						if(value2.usuario_muestra_id == null){
							value2.success = false;
							value2.estado = "Pendiente";
						}
						else{
							value2.success = true;
							value2.estado = "Realizado";
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
				if(value.usuario_muestra_id == null){
					value.success = false;
					value.estado = "Pendiente";
				}
				else{
					value.success = true;
					value.estado = "Realizado";
				}
				//console.log(value);
				$scope.examenesSeleccionados.push(value);
			}
			i++;
		}
	};
});
