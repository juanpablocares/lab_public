angular.module('lab').controller('OrdenesExamenIngresoResultadosController', function($scope, $auth, $state, $http, $stateParams, Ficha) {

	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');
	else{
		Ficha.get({
			id : $stateParams.ficha_id
		}, function(result) {
			$scope.ficha = result.data;
		});
	}

	/*$scope.setValorSustanciaExamen = function() {
		for (var j = 0; j < $scope.detalleFicha.examen.sustancias.length; j++) {
			var sustancia = $scope.detalleFicha.examen.sustancias[j]
			for (var i = 0; i < $scope.resultados.length; i++) {
				
				if ($scope.resultados[i].detalle_ficha_id == $scope.detalleFicha.id && $scope.resultados[i].hasOwnProperty('sustancia_id') && $scope.resultados[i].sustancia_id == sustancia.id) {
					sustancia.cantidad_sustancia = $scope.resultados[i].cantidad_sustancia;
					sustancia.input_value = $scope.resultados[i].cantidad_sustancia;
					sustancia.resultado_id = $scope.resultados[i].id;
				}
			}
			$scope.resultsForm.sustancias.push(sustancia);
		};
	}*/

	//$scope.$emit('PedirDetalleFichaFromMenu');

	$scope.guardar_resultados = function() {

	};

});
