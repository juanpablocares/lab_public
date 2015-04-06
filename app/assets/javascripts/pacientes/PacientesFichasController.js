angular.module('lab').controller('PacientesFichasController', ['$scope', '$stateParams', 'Fichas', '$http',
function($scope, $stateParams, Fichas, $http) {

	$scope.paciente = {};

	$scope.$on('pacienteFromMenu', function(event, data) {
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		$scope.paciente = data;
	});

	$scope.isData = false;
	//Descomentar para pedir datos del paciente desde el controlador paciente menu
	//$scope.$emit('PedirPacienteFromMenu');

	Fichas.by_paciente.paciente_id({
		id : $stateParams.paciente_id
	}, function(datos) {

		$scope.rowCollection = datos.fichas;
		if (datos.fichas.length == 0) {
			$scope.isData = false;
		}
		else {
			$scope.isData = true;
		}
	});
}]);
