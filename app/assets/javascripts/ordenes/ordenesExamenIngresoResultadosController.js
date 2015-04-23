angular.module('lab').controller('OrdenesExamenIngresoResultadosController', function($scope, $auth, $state, $http, $stateParams, ResultadosExamen) {

	if ($stateParams.detalle_ficha_id == null)
		$state.go('loginRequired.index');

	$scope.detalleFicha = {};
	$scope.resultsForm = {};
	$scope.resultsForm.sustancias = [];
	
	console.log($scope.resultsForm);

	//Recobrar ficha desde el menu
	$scope.$on('detalleFichaFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.detalleFicha = data;
			$scope.resultados = {};
			ResultadosExamen.by_detalle_ficha.get({
				id : $scope.detalleFicha.id
			}).$promise.then(function(results) {
				$scope.resultados = results.data;
				$scope.setValorSustanciaExamen();
			});
		}
	});

	$scope.setValorSustanciaExamen = function() {
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
	}

	$scope.$emit('PedirDetalleFichaFromMenu');

	$scope.guardarResultados = function() {
		if ($scope.formResultados.$valid) {
			ResultadosExamen.by_detalle_ficha.save({
				id: $scope.detalleFicha.id
			}, {sustancias: $scope.resultsForm.sustancias}).$promise.then(function(results){
				$state.go('loginRequired.ordenes_examen.info',{detalle_ficha_id : $scope.detalleFicha.id});
			}).catch(function(results){
				console.log("error al guardar resultados");
			});
		}
	};

});
