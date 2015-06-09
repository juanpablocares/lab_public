angular.module('lab').controller('OtrosTiposPagosController', function($scope, $http, $stateParams, $auth, $state, TipoPago, TiposPagos) {

	$scope.isLoading = true;

	$http.get('/api/tipos_pago').success(function(data) {
		$scope.tipos_pago = data.data;
		for(i = 0; i < $scope.tipos_pago.length; i++)
			$scope.tipos_pago[i].boton_agregar = true;
		$scope.isLoading = false;
	}).error(function(data) {
		// log error
	});
	
	$scope.change = function(indice){
		$scope.tipos_pago[indice].boton_agregar = false;
	};
	
	$scope.add = function(){
		$scope.tipos_pago.push({
			nombre: '',
			descripcion: '',
          });
	};
	
	$scope.create = function(indice){
		ProcesoExamen.update({id:$scope.tipos_pago[indice].id}, $scope.tipos_pago[indice]).
			$promise.
				then(function(response) {
					console.log("Edicion de tipos_pago");
				}, function(response) {
					console.log("ERROR editando tipos_pago");
					$scope.resetTarifaExamen();
				});
	};
	
	$scope.guardar_cambios = function(tipos_pago){
		TiposPagos.all.update({
				tipos_pago : $scope.tipos_pago,
			}).
			$promise.then(function(result) {
				console.log('update tipos_pago');
				console.log(result);
			});
			
		$http.get('/api/tipos_pago').success(function(data) {
			$scope.tipos_pago = data;
			for(i = 0; i < $scope.tipos_pago.length; i++)
				$scope.tipos_pago[i].boton_agregar = true;
		}).error(function(data) {
			// log error
		});
	};
	
	$scope.remove = function(indice){
		
		TipoPago.delete({id:$scope.tipos_pago[indice].id}).
			$promise.
				then(function(response) {
					if (indice > -1) {
						$scope.tipos_pago.splice(indice, 1);
					}
					console.log("Eliminado tipos_pago");
				}, function(response) {
					console.log("ERROR eliminando tipos_pago");
				});
	};
});