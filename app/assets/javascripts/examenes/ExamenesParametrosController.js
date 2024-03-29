angular.module('lab').controller('ExamenesParametrosController', function($scope, $http, $stateParams, $auth, $state, ExamenParametro, ExamenesParametros) {

	$scope.isLoading = true;
	$scope.array_parametros = [];
	
	$scope.update_parametro = function(indice){
		console.log(indice);
		console.log($scope.array_parametros);
	}
	
	$scope.set_initial_data = function(){
		$http.get('/api/parametros').success(function(data) {
			//console.log(data);
			$scope.parametros = data.parametros;
			$http.get('/api/examenes_parametros/examen/' + $stateParams.examen_id).success(function(data) {
				$scope.array_parametros = data.examenes_parametros;
				
				for(i in $scope.array_parametros){
					for(j in $scope.parametros)
						if($scope.array_parametros[i].parametro_id == $scope.parametros[j].id){
							$scope.array_parametros[i].parametro = $scope.parametros[j];
							break;
						}
					if($scope.array_parametros[i].parametro.tipo == 'seleccionable'){
						for(j in $scope.array_parametros[i].parametro.valor_parametro)
							if($scope.array_parametros[i].parametro.valor_parametro[j].nombre == $scope.array_parametros[i].valor_defecto){
								$scope.array_parametros[i].valor = $scope.array_parametros[i].parametro.valor_parametro[j];
								break;
							}
					}
					if($scope.array_parametros[i].parametro.tipo == 'numerico')
						$scope.array_parametros[i].valor_defecto = parseInt($scope.array_parametros[i].valor_defecto);
				}
				
				$scope.isLoading = false;
			}).error(function(data) {
				// log error
			});
		}).error(function(data) {
			// log error
		});
	}
	
	$scope.set_initial_data();
	
	$scope.change = function(indice){
		$scope.array_parametros[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.array_parametros.push({
			examen_id: $stateParams.examen_id,
          });
	};
	
	$scope.guardar_cambios = function(array_parametros){
		$scope.isLoading = true;
		console.log(array_parametros);
		for(i in array_parametros)
			if(array_parametros[i].parametro){
				array_parametros[i].parametro_id = array_parametros[i].parametro.id;
				if(array_parametros[i].parametro.tipo == 'seleccionable')
					if(array_parametros[i].valor)
						array_parametros[i].valor_defecto = array_parametros[i].valor.nombre;
					else
						array_parametros[i].valor_defecto = '';
			}
			else{
				alert('Falta ingresar un valor de parámetro');
				return ;
			}
		ExamenesParametros.all.update({
				examenes_parametros : array_parametros,
			}).
			$promise.then(function(result) {
				console.log('update examenes parametros');
				$scope.set_initial_data();
			});
	};
	
	$scope.remove = function(indice){
		ExamenParametro.delete({id: $scope.array_parametros[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.array_parametros.splice(indice, 1);
					}
					console.log("Eliminado parametro de examen");
				}, function(response) {
					console.log("ERROR eliminando parametro de examen");
				});
	};
});