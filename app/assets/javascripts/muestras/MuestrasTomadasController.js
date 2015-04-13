angular.module('lab').controller('MuestrasTomadasController', function($scope, $http, $stateParams, $auth, $state, DetallesFicha) {
	$scope.$on('fichaFromMenu', function(event, data) {
		$scope.ficha = data;
		$scope.masterFicha = angular.copy($scope.ficha);
	});

	$scope.muestras = {};

	//Sin ficha, enviar al home
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.index');

	DetallesFicha.id.muestras_tomadas().$promise.then(function(data) {
		$scope.muestras = data.data;
		console.log(data);
		console.log($scope.muestras);
	});
});
