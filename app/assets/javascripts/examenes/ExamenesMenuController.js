angular.module('lab').controller('ExamenesMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Ficha técnica',
		state : 'loginRequired.examenes.info({examen: examen})',
		id : 'loginRequired.examenes.info',
	},{
		name : 'Valores referencia',
		state : 'loginRequired.examenes.referencia({examen: examen})',
		id : 'loginRequired.examenes.referencia',
	},{
		name : 'Precios',
		state : 'loginRequired.examenes.precios({examen: examen})',
		id : 'loginRequired.examenes.precios',
	},{
		name : 'Parámetros',
		state : 'loginRequired.examenes.parametros({examen: examen})',
		id : 'loginRequired.examenes.parametros',
	}];

	$scope.$on('examenFromEdit', function(event, data) {
		$scope.examen = data;
	});
	
	$http.get('/api/examenes/' + $stateParams.examen_id).success(function(data) {

		$scope.examen = data.examen;
		$scope.$broadcast('examenFromMenu', $scope.examen);
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});