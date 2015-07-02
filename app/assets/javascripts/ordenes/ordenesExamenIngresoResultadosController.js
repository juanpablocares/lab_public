angular.module('lab').controller('OrdenesExamenIngresoResultadosController', function($scope, $auth, $state, $http, $stateParams, Fichas, ResultadosExamen) {

	$scope.valores_seleccionables = {};
	$scope.mostrar_parametros = [];
	
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');
	else{
		Fichas.input_resultados.get({
			id : $stateParams.ficha_id
		}, function(result) {
			$scope.ficha = result.data;
			console.log($scope.ficha);
			var contador = 1;
			for(var i in $scope.ficha.detalles_ficha){
				for(var j in $scope.ficha.detalles_ficha[i].examen.examenes_parametros){
					if($scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro != undefined){
						/*Si entra aca, es que el examen tiene parametro, pero no necesariamente tiene el resultado*/
						var tmp = {};
						tmp.detalle_ficha_id = $scope.ficha.detalles_ficha[i].id;
						tmp.examen_id = $scope.ficha.detalles_ficha[i].examen_id;
						tmp.deshabilitar = false;
						
						tmp.color_save = 'green';
						tmp.examen_parametro_id = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].id;
						tmp.nombre_parametro = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].nombre;
						tmp.tipo = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro.tipo;
						if(tmp.tipo == 'numerico')
							tmp.cantidad = parseInt($scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].valor_defecto);
						else
							tmp.cantidad = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].valor_defecto;
						tmp.unidad_medida = $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].unidad_medida;
						tmp.mostrar = true;
						if($scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro.tipo == 'seleccionable'){
							tmp.tipo = 'texto';
						}
						
						for(var k in $scope.ficha.detalles_ficha[i].resultados_examen)
							if($scope.ficha.detalles_ficha[i].resultados_examen[k].examen_parametro_id == $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].id){
								/*Entra aca, el examen del detalle ficha tiene resultado*/
								tmp.estado = 2;
								if(tmp.tipo == 'numerico')
									tmp.cantidad = parseInt($scope.ficha.detalles_ficha[i].resultados_examen[k].cantidad);
								else
									tmp.cantidad = $scope.ficha.detalles_ficha[i].resultados_examen[k].cantidad;
							}
						if($scope.ficha.detalles_ficha[i].usuario_muestra != undefined){
							tmp.flebotomista = $scope.ficha.detalles_ficha[i].usuario_muestra.nombre + ' ' + $scope.ficha.detalles_ficha[i].usuario_muestra.apellido_paterno;
							tmp.estado = 1;
						}
						else{
							tmp.estado = 0;
							tmp.deshabilitar = true;
							tmp.cantidad = '';
						}
						if(j == 0){
							tmp.nombre = $scope.ficha.detalles_ficha[i].examen.nombre;
							tmp.indice = contador;
							contador++;
						}
						else
							tmp.flebotomista = '';
						$scope.mostrar_parametros.push(tmp);
					}
				}
				
				if($scope.ficha.detalles_ficha[i].examen.examenes_parametros.length == 0){
					/*Si entra aca, no tiene los parámetros definidos el examen*/
					var tmp = {};
					tmp.nombre = $scope.ficha.detalles_ficha[i].examen.nombre;
					tmp.mostrar = false;
					tmp.indice = contador;
					contador++;
					$scope.mostrar_parametros.push(tmp);
				}
			}
		});
	}

	$scope.guardar_resultado = function(indice, resultado){
		resultado.color_save = 'red';
		$scope.mostrar_parametros[indice].estado = 2;
		console.log(resultado);
		ResultadosExamen.exaparam_detficha.update({
			detalle_ficha_id 	: resultado.detalle_ficha_id,
			examen_parametro_id	: resultado.examen_parametro_id,
			resultado : resultado,
		}).
		$promise.
			then(function(response) {
				console.log(response);
				resultado.color_save = 'green';
			}, function(response) {
				console.log("ERROR guardando resultado");
			});
	};

});
