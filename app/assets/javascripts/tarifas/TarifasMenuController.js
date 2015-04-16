angular.module('lab').controller('TarifasMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Informacion',
		state : 'loginRequired.tarifas.info({tarifa: tarifa})',
		id : 'loginRequired.tarifas.info',
		}, {
		name : 'Exámenes',
		state : 'loginRequired.tarifas.examenes()',
		id : 'loginRequired.tarifas.examenes',
	}];

	$scope.$on('tarifaFromEdit', function(event, data) {
		$scope.tarifa = data;
	});
	
	$http.get('/api/tarifas/' + $stateParams.tarifa_id).success(function(data) {
		$scope.tarifa = data.tarifa;
		$scope.$broadcast('tarifaFromMenu', $scope.tarifa);
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});
