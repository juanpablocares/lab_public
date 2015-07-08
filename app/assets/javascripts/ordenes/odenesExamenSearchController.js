angular.module('lab').controller('OrdenesExamenSearchController', function($scope, $http, $stateParams, $auth, $state, DetallesFicha) {
	$scope.comienzo_tabla = 0;
	$scope.muestras = [];
	
	$scope.callServer = function callServer(tableState) {
		$scope.isLoading = true;
	
		var pagination = tableState.pagination;
	
		$scope.comienzo_tabla = pagination.start || 0;
		// This is NOT the page number, but the index of item in the list that you want to use to display the table.
		var number = pagination.number || 10;
		// Number of entries showed per page.
	
		DetallesFicha.muestras_tomadas.advanced({
			start : $scope.comienzo_tabla,
			number : number
		}, tableState).$promise.then(function(result) {
			$scope.muestras = result.data;
			tableState.pagination.numberOfPages = result.numberOfPages;
			
			for(var i in $scope.muestras){
				if($scope.muestras[i].examen.examenes_parametros.length == 0){
					$scope.muestras[i].estado = -1;
				}
				else{
					$scope.muestras[i].estado = 1;
					if($scope.muestras[i].examen.examenes_parametros.length > 0 && $scope.muestras[i].resultados_examen.length == $scope.muestras[i].examen.examenes_parametros.length)
						$scope.muestras[i].estado = 2;
					var count = 0;
					for(var j in $scope.muestras[i].resultados_examen)
						if($scope.muestras[i].resultados_examen[j].usuario_valida_id != null)
							count++;
					if($scope.muestras[i].resultados_examen.length == count)
						$scope.muestras[i].estado = 3;
					console.log($scope.muestras[i]);
				}
			}
			
			$scope.isLoading = false;
		});
	};
});