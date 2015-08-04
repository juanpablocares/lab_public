angular.module('lab').controller('EstadisticasMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Fichas',
		state : 'loginRequired.estadisticas.fichas',
		id : 'loginRequired.estadisticas.fichas',
	},{
		name : 'Previsiones',
		state : 'loginRequired.estadisticas.previsiones',
		id : 'loginRequired.estadisticas.previsiones',
	},];
});