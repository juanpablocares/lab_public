angular.module('lab').controller('FichasExamenesController', ['$scope', '$stateParams', 'DetallesFicha', '$http',
function($scope, $stateParams, DetallesFicha) {

	$scope.ficha = {};
	//Recobrar ficha desde el menu
	$scope.$on('fichaFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.ficha = data;
		}
	});
	$scope.$emit('PedirFichaFromMenu');
	
	$scope.callServer = function callServer(tableState) {
		$scope.isLoading = true;
	
		var pagination = tableState.pagination;
	
		var start = pagination.start || 0;
		// This is NOT the page number, but the index of item in the list that you want to use to display the table.
		var number = pagination.number || 10;
		// Number of entries showed per page.

		DetallesFicha.by_ficha.get({
			id : $stateParams.ficha_id,
			start : start,
			number : number
		}, function(result) {
			$scope.examenesFichaArray = result.data;
			if(result.data.length > 0)	$scope.isData = true;
			tableState.pagination.numberOfPages = result.numberOfPages;
			$scope.isLoading = false;
			$scope.setEstadoExamenes();
		});
	};
	$scope.setEstadoExamenes = function()
	{
		for(i = 0; i < $scope.examenesFichaArray.length; i++ )
		{
			value = $scope.examenesFichaArray[i];
			
			value.estado = {};
			
			if(value.usuario_muestra_id == null)
			{
				value.estado.class = 'warning';
				value.estado.texto = 'Toma de Muestra';
			}
			else
			{
				if(value.resultados_examen.length == value.examen.sustancias.length)
				{
					value.estado.texto = 'Resultados ingresados';
					value.estado.class = 'info';
				}
				else if(value.resultados_examen.length < value.examen.sustancias.length  || value.resultados_examen.length == 0)
				{
					value.estado.class = 'success';
					value.estado.texto = 'Ingreso de resultados';
				}
				else
				{
					value.estado.class = 'danger';
					value.estado.texto = 'Error en resultados';
				}
			}
		}
	};
}]);

