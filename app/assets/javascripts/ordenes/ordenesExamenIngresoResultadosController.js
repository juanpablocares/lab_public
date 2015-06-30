angular.module('lab').controller('OrdenesExamenIngresoResultadosController', function($scope, $auth, $state, $http, $stateParams, Fichas) {

	$scope.valores_seleccionables = {};
	$scope.mostrar_parametros = [];
	
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');
	else{
		Fichas.input_resultados.get({
			id : $stateParams.ficha_id
		}, function(result) {
			$scope.ficha = result.data;
			//console.log($scope.ficha);
			for(var i in $scope.ficha.detalles_ficha){
				var tmp = {};
				tmp.nombre = $scope.ficha.detalles_ficha[i].examen.nombre;
				tmp.examen_id = $scope.ficha.detalles_ficha[i].examen.id;
				tmp.mostrar = false;
				for(var j in $scope.ficha.detalles_ficha[i].examen.examenes_parametros){
					if($scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro != undefined){
						tmp.mostrar = true;
						if(j == 0)
							tmp.nombre = $scope.ficha.detalles_ficha[i].examen.nombre;
						tmp.tipo = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro.tipo;
						if(tmp.tipo == 'seleccionable')
							tmp.datos = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro.valor_parametro;
						tmp.unidad_medida = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro.unidad;
						$scope.mostrar_parametros.push(tmp);
					}
				}
				console.log(tmp);
				console.log($scope.ficha.detalles_ficha[i].examen.examenes_parametros.length);
				if($scope.ficha.detalles_ficha[i].examen.examenes_parametros.length == 0)
					$scope.mostrar_parametros.push(tmp);
			}
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
