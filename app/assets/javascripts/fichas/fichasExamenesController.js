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
	
	DetallesFicha.by_ficha.get({
		id : $stateParams.ficha_id,
		start : 0,
		number : 1000
	}, function(result) {
		$scope.examenesFichaArray = result.data;
		$scope.setEstadoExamenes();
	});
	
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

