angular.module('lab').controller('PrevisionesNewController', function($scope, $auth, $state, $http, $stateParams, $resource) {
	
	$scope.masterPrevision = {};
	
	$http.get('/api/tarifas').success(function(data) {
		$scope.tarifas = data;
	}).error(function(data) {
		// log error
	});

	$scope.cambiarVentanaSinCambios = function() {
	};

	$scope.guardarDatosPrevision = function(prevision) {
		console.log('guardar prevision');
		prevision.tarifa_id = prevision.tarifa.id;
		prevision.creado = Date();
		var Prevision = $resource('/api/previsiones', $scope.prevision);
		var prevision = new Prevision();
		prevision.$save().then(function(results) {
			$state.go('loginRequired.previsiones.info',{prevision_id: results.data.id});
		});
	}
});
