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
			$scope.ficha.paciente.edad = $scope.getEdad($scope.ficha.paciente.fecha_nacimiento);
			console.log($scope.ficha);
			var contador = 1;
			for(var i in $scope.ficha.detalles_ficha){
				for(var j in $scope.ficha.detalles_ficha[i].examen.examenes_parametros){
					if($scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].parametro != undefined){
						/*Si entra aca, es que el examen tiene parametro, pero no necesariamente tiene el resultado*/
						var tmp = {};
						tmp.detalle_ficha_id = $scope.ficha.detalles_ficha[i].id;
						tmp.examen_id = $scope.ficha.detalles_ficha[i].examen_id;
						tmp.validado = false;
						tmp.color_validado = 'red';
						tmp.deshabilitar = false;
						tmp.color_save = 'red';
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
						
						if($scope.ficha.detalles_ficha[i].usuario_muestra_id != null){
							tmp.flebotomista = $scope.ficha.detalles_ficha[i].usuario_muestra.apellido_paterno + ', ' + $scope.ficha.detalles_ficha[i].usuario_muestra.nombre;
							tmp.fecha_muestra = $scope.formatear_fecha($scope.ficha.detalles_ficha[i].fecha_muestra);
							tmp.estado = 1;
						}
						else{
							tmp.estado = 0;
							tmp.deshabilitar = true;
							tmp.cantidad = '';
						}
						
						for(var k in $scope.ficha.detalles_ficha[i].resultados_examen)
							if($scope.ficha.detalles_ficha[i].resultados_examen[k].examen_parametro_id == $scope.ficha.detalles_ficha[i].examen.examenes_parametros[j].id){
								/*Entra aca, el examen del detalle ficha tiene resultado*/
								tmp.estado = 2;
								tmp.color_save = 'green';
								tmp.grabado = $scope.ficha.detalles_ficha[i].resultados_examen[k].usuario_graba.apellido_paterno + ', ' + $scope.ficha.detalles_ficha[i].resultados_examen[k].usuario_graba.nombre;
								tmp.fecha_grabacion = $scope.formatear_fecha($scope.ficha.detalles_ficha[i].resultados_examen[k].creado);
									
								if(tmp.tipo == 'numerico')
									tmp.cantidad = parseInt($scope.ficha.detalles_ficha[i].resultados_examen[k].cantidad);
								else
									tmp.cantidad = $scope.ficha.detalles_ficha[i].resultados_examen[k].cantidad;
								if($scope.ficha.detalles_ficha[i].resultados_examen[k].usuario_valida_id != null){
									/*Si entra aca, el resultado esta validado*/
									tmp.estado = 3;
									tmp.color_validado = 'green';
									tmp.validador = $scope.ficha.detalles_ficha[i].resultados_examen[k].usuario_valida.apellido_paterno + ', ' + $scope.ficha.detalles_ficha[i].resultados_examen[k].usuario_valida.nombre;
									tmp.fecha_validacion = $scope.formatear_fecha($scope.ficha.detalles_ficha[i].resultados_examen[k].fecha_usuario_valida);
								}
							}
						if(j == 0){
							tmp.nombre = $scope.ficha.detalles_ficha[i].examen.nombre;
							tmp.indice = contador;
							contador++;
							tmp.agrupar = false;
						}
						else{
							tmp.flebotomista = '';
							tmp.agrupar = true;
						}
						tmp.cantidad_parametros = $scope.ficha.detalles_ficha[i].examen.examenes_parametros.length;
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
					tmp.examen_id = $scope.ficha.detalles_ficha[i].examen_id;
					$scope.mostrar_parametros.push(tmp);
				}
			}
		});
	}

	$scope.guardar_resultado = function(indice, resultado){
		if(resultado.estado < 1){
			alert('Examen sin muestra');
			return ;
		}
		
		resultado.user_id = $auth.user.id;
		console.log(resultado);
		ResultadosExamen.exaparam_detficha.update({
			detalle_ficha_id 	: resultado.detalle_ficha_id,
			examen_parametro_id	: resultado.examen_parametro_id,
			resultado : resultado,
		}).
		$promise.
			then(function(response) {
				console.log(response);
				resultado.estado = 2;
				resultado.color_save = 'green';
				resultado.fecha_grabacion = $scope.formatear_fecha((new Date()).toString());
				resultado.grabado = $auth.user.apellido_paterno + ', ' + $auth.user.nombre;
				
				resultado.color_validado = 'red';
				resultado.fecha_validacion = '';
				resultado.validador = '';
			}, function(response) {
				console.log("ERROR guardando resultado");
			});
	};

	$scope.validar_resultado = function(indice, resultado){
		if(resultado.estado < 2){
			alert('Examen sin resultado grabado');
			return ;
		}
		
		resultado.usuario_valida_id = $auth.user.id;
		console.log(resultado);
		ResultadosExamen.exaparam_detficha_validar.update({
			detalle_ficha_id 	: resultado.detalle_ficha_id,
			examen_parametro_id	: resultado.examen_parametro_id,
			resultado : resultado,
		}).
		$promise.
			then(function(response) {
				console.log(response);
				$scope.mostrar_parametros[indice].estado = 3;
				resultado.color_validado = 'green';
				resultado.fecha_validacion = $scope.formatear_fecha((new Date()).toString());
				resultado.validador = $auth.user.apellido_paterno + ', ' + $auth.user.nombre;
			}, function(response) {
				console.log("ERROR guardando resultado");
			});
	};
	
	$scope.agregar_zero = function(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	
	$scope.formatear_fecha = function(fecha_string){
		var fecha = new Date(fecha_string);
		var fecha_formato = $scope.agregar_zero(fecha.getDate()) + "-" + $scope.agregar_zero(fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + $scope.agregar_zero(fecha.getHours()) + ":" + $scope.agregar_zero(fecha.getMinutes());
		return fecha_formato;
	};
	
	$scope.getEdad = function(data) {
		if (data != null) {
			data = new Date(data);
			data = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate());

			var d = new Date();
			var meses = 0;
			if (data.getUTCMonth() - d.getMonth() > 0)
				meses += 12 - data.getUTCMonth() + d.getMonth();
			else
				meses = Math.abs(data.getUTCMonth() - d.getMonth());
			var nac = new Date(data);
			var birthday = +new Date(data);
			var anios = ((Date.now() - birthday) / (31556926000));
			return ~~anios + " Años " + ~~meses + " meses";
		}
	};
});
