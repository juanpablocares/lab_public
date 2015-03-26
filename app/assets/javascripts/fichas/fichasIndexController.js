angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $stateParams, Fichas) {

	$scope.editExamenes = false;
	$scope.ficha = {};
	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	//Obtener ficha buscada
	Fichas.id.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(result) {
		console.log(result);
		if ($stateParams.paciente_id == null)
		{
			$state.go('loginRequired.paciente.ficha', {
				paciente_id : result.data.paciente_id,
				ficha_id : result.data.id
			});
		}
		else
		{
			$scope.ficha = result.data;
		}

	}).catch(function(response) {
		console.error('Error al obtener ficha');
		$state.go('loginRequired.index');
	});

	//Recobrar paciente desde el menu
	$scope.$on('pacienteFromMenu', function(event, data) {
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		$scope.paciente = data;
	});

});
