angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas, Perfiles) {

	$scope.editExamenes = false;
	$scope.examenesSeleccionados = [];
	$scope.ficha = {};
	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	//Obtener ficha buscada
	Fichas.id.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		if ($stateParams.paciente_id == null) {
			$state.go('loginRequired.paciente.ficha', {
				paciente_id : result.data.paciente_id,
				ficha_id : result.data.id
			});
		}
		else {
			$scope.ficha = result.data;
			$scope.ordenarExamenes();
		}

	}).catch(function(response) {
		console.error('Error al obtener ficha');
		$state.go('loginRequired.index');
	});

	$scope.ordenarExamenes = function() {
		var i = 0;
		while(i < $scope.ficha.detalles_ficha.length)
		{
			value = $scope.ficha.detalles_ficha[i];
			if(value.perfil_id != null)
			{
				var perfilTemp = value.perfil;
				perfilTemp.detalles_ficha = [];
				perfilTemp.perfil = true;
				var j = 0;
				while(j < $scope.ficha.detalles_ficha.length)
				{
					value2 = $scope.ficha.detalles_ficha[j];
					if(value.perfil_id == value2.perfil_id)
					{
						perfilTemp.detalles_ficha.push(value2);
						if(value.id == value2.id)i--;
						$scope.ficha.detalles_ficha.splice(j,1);
					}
					else j++;
				}
				$scope.examenesSeleccionados.push(perfilTemp);
			}
			else
			{
				$scope.examenesSeleccionados.push(value);
			}
			i++;
			console.log($scope.examenesSeleccionados);
		}
	};

	//Recobrar paciente desde el menu
	$scope.$on('pacienteFromMenu', function(event, data) {
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		$scope.paciente = data;
	});

});
