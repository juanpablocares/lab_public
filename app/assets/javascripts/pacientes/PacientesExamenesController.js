angular.module('lab').controller('PacientesExamenesController', ['$scope', '$stateParams', 'DetallesFicha', '$http',
function($scope, $stateParams, DetallesFicha) {

	$scope.paciente = {};

	$scope.$on('pacienteFromMenu', function(event, data) {
		data.fecha_nacimiento = new Date(data.fecha_nacimiento.getUTCFullYear(), data.fecha_nacimiento.getUTCMonth(), data.fecha_nacimiento.getUTCDate());
		$scope.paciente = data;
	});

	$scope.isData = false;
	//Descomentar para pedir datos del paciente desde el controlador paciente menu
	$scope.$emit('PedirPacienteFromMenu');
	
	$scope.callServer = function callServer(tableState) {
		$scope.isLoading = true;
	
		var pagination = tableState.pagination;
	
		var start = pagination.start || 0;
		// This is NOT the page number, but the index of item in the list that you want to use to display the table.
		var number = pagination.number || 10;
		// Number of entries showed per page.

		DetallesFicha.by_paciente.get({
			id : $stateParams.paciente_id,
			start : start,
			number : number
		}, function(result) {
			$scope.examenesPacienteArray = result.data;
			if(result.data.length > 0)	$scope.isData = true;
			tableState.pagination.numberOfPages = result.numberOfPages;
			$scope.isLoading = false;
		});
	};
	$scope.getEstado = function(detalle_ficha)
	{
		if(detalle_ficha.usuario_muestra_id == null)return "Muestra no tomada";
		if(detalle_ficha.usuario_muestra_id != null)return "Muestra tomada";
		
	};
}]);

