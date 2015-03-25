angular.module('lab').controller('FichasMenuController', function($scope, $http, $stateParams, $auth, $state, Ficha) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Informacion',
		state : 'loginRequired.fichas.info({ficha: ficha})',
		id : 'loginRequired.fichas.info',
	},{
		name : 'Precios',
		state : 'loginRequired.pacientes.fichas({ficha: ficha})',
		id : 'loginRequired.pacientes.fichas',
	}];

	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});
	
	Ficha.get({
				id : $stateParams.ficha_id
			}).
			$promise.then(function(data) {
				$scope.ficha = data.ficha;
				$scope.$broadcast('fichaFromMenu', $scope.ficha);
			});
	
	$http.get('/api/fichas/'+$stateParams.ficha_id).success(function(data) {
		$scope.ficha = data.ficha;
		$scope.$broadcast('fichaFromMenu', $scope.ficha);
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});
