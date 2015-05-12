angular.module('lab').controller('PacientesCotizacionesController', ['$scope', '$stateParams', 'Cotizaciones', '$http',
function($scope, $stateParams, Cotizaciones, $http) {

	$scope.paciente = {};

	$scope.$on('pacienteFromMenu', function(event, data) {
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		$scope.paciente = data;
	});

	$scope.isData = false;
	//Descomentar para pedir datos del paciente desde el controlador paciente menu
	//$scope.$emit('PedirPacienteFromMenu');

	Cotizaciones.by_paciente.paciente_id({
		id : $stateParams.paciente_id
	}, function(datos) {

		$scope.rowCollection = datos.cotizaciones;
		if (datos.cotizaciones.length == 0) {
			$scope.isData = false;
		}
		else {
			$scope.isData = true;
		}
	});
}]);
