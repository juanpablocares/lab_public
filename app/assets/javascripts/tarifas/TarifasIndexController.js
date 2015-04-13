angular.module('lab').controller('TarifasIndexController', function($scope, $auth, $state, $http, $stateParams, Tarifa) {
	
	$scope.$on('tarifaFromMenu', function(event, data) {
		console.log(data);
		$scope.tarifa = data;
		$scope.masterTarifa = angular.copy($scope.tarifa);
	});

	$scope.tarifaEditing = false;
	
	if ($stateParams.tarifa != null) {
		$scope.tarifa = $stateParams.tarifa;
		$scope.masterTarifa = angular.copy($scope.tarifa);
	}
	
	$scope.resetTarifa = function() {
		$scope.tarifaEditingForm.$setPristine();
		$scope.tarifa = angular.copy($scope.masterTarifa);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.tarifaEditing = !$scope.tarifaEditing;
		$scope.resetTarifa();
	};

	$scope.updateTarifa = function() { 
		$scope.masterTarifa = angular.copy($scope.tarifa);
		$scope.$emit('tarifaFromEdit',$scope.tarifa);
	};

	$scope.guardarDatosTarifa = function(tarifa) {
		console.log('guardar tarifa');
		tarifa.creado = Date();
		Tarifa.update({id:tarifa.id}, tarifa).
			$promise.
				then(function(response) {
					$scope.masterTarifa = angular.copy($scope.tarifa);
					$scope.$emit('tarifaFromEdit',$scope.tarifa);
					$scope.tarifaEditing = !$scope.tarifaEditing;
				}, function(response) {
					$scope.resetTarifa();
					console.log("ERROR editando tarifa");
				});
	};
});
