angular.module('lab').controller('FichasExamenesController', ['$scope', '$stateParams', 'DetallesFicha', '$http',
function($scope, $stateParams, DetallesFicha) {
	$scope.isData = false;
	
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
		if($scope.examenesFichaArray.length > 0)
		{
			$scope.isData = true;
			$scope.setEstadoExamenes();
		}
	});
	
	$scope.setEstadoExamenes = function()
	{
		console.log($scope.examenesFichaArray );
		for(i = 0; i < $scope.examenesFichaArray.length; i++ )
		{
			value = $scope.examenesFichaArray[i];
			
			value.estado = {};
			
			if(value.usuario_muestra_id == null)
			{
				value.estado.class = 'warning';
				value.estado.texto = 'Toma de muestra pendiente';
			}
			else
			{
				if(value.resultados_examen.length == value.examen.sustancias.length)
				{
					value.estado.texto = 'Resultados ingresados';
					value.estado.class = 'info';
				} 
				else if(value.resultados_examen.length < value.examen.sustancias.length || value.examen.sustancias.length == 0)
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

