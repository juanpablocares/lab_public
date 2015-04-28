angular.module('lab').controller('PrevisionesMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Informacion',
		state : 'loginRequired.previsiones.info({prevision: prevision})',
		id : 'loginRequired.previsiones.info',
		}, {
		name : 'Exámenes',
		state : 'loginRequired.tarifas.examenes()',
		id : 'loginRequired.tarifas.examenes',
	}];

	$scope.$on('previsionFromEdit', function(event, data) {
		$scope.prevision = data;
	});
	
	$http.get('/api/previsiones/' + $stateParams.prevision_id).success(function(data) {
		$scope.prevision = data.prevision;
		$scope.$broadcast('previsionFromMenu', $scope.prevision);
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});
