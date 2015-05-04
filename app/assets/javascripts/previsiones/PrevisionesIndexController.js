angular.module('lab').controller('PrevisionesIndexController', function($scope, $auth, $state, $http, $stateParams, Prevision) {
	
	$scope.masterPrevision = {};
	
	$http.get('/api/tarifas').success(function(data) {
		$scope.tarifas = data;
	}).error(function(data) {
		// log error
	});
	
	$scope.$on('previsionFromMenu', function(event, data) {
		console.log(data);
		$scope.prevision = data;
		$http.get('/api/tarifas').success(function(data) {
			$scope.tarifas = data;
		}).error(function(data) {
			// log error
		});
		$scope.masterPrevision = angular.copy($scope.prevision);
	});

	$scope.previsionEditing = false;
	
	if ($stateParams.prevision != null) {
		$scope.prevision = $stateParams.prevision;
		$scope.masterPrevision = angular.copy($scope.prevision);
	}
	
	$scope.resetPrevision = function() {
		$scope.previsionEditingForm.$setPristine();
		$scope.prevision = angular.copy($scope.masterPrevision);
	};

	$scope.cambiarVentanaSinCambios = function() {
		$scope.previsionEditing = !$scope.previsionEditing;
		$scope.resetPrevision();
	};

	$scope.updatePrevision = function() { 
		$scope.masterPrevision = angular.copy($scope.prevision);
		$scope.$emit('previsionFromEdit',$scope.prevision);
	};

	$scope.guardarDatosPrevision = function(prevision) {
		console.log('guardar prevision');
		console.log(prevision);
		prevision.creado = Date();
		prevision.tarifa_id = prevision.tarifa.id
		Prevision.update({id:prevision.id}, prevision).
			$promise.
				then(function(response) {
					$scope.masterPrevision = angular.copy($scope.prevision);
					$scope.$emit('previsionFromEdit',$scope.prevision);
					$scope.previsionEditing = !$scope.previsionEditing;
				}, function(response) {
					$scope.resetPrevision();
					console.log("ERROR editando prevision");
				});
	};
});
