angular.module('lab').controller('ExamenesMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Informacion',
		state : 'loginRequired.examenes.info({examen: examen})',
		id : 'loginRequired.examenes.info',
	},{
		name : 'Precios',
		state : 'loginRequired.pacientes.examenes({examen: examen})',
		id : 'loginRequired.pacientes.examenes',
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