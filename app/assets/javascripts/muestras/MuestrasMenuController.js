angular.module('lab').controller('MuestrasMenuController', function($scope, $http, $stateParams, $auth, $state, Ficha) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Informacion',
		state : 'loginRequired.muestras.info({muestra: muestra})',
		id : 'loginRequired.muestras.info',
	},{
		name : 'Examenes',
		state : 'loginRequired.muestras.examenes({muestra: muestra})',
		id : 'loginRequired.muestras.examenes',
	}];

	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});

	Ficha.get({
		id : $stateParams.ficha_id
	}).$promise.then(function(data) {
		$scope.ficha = data.data;
		$scope.$broadcast('fichaFromMenu', $scope.ficha);
	}).catch(function(data) {
		console.log("Error obteniendo ficha desde MuestrasMenuController");
		$state.go('loginRequired.index');
	});
});
