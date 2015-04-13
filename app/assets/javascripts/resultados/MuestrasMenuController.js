angular.module('lab').controller('MuestrasMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Informacion',
		state : 'loginRequired.muestras.info({muestra: muestra})',
		id : 'loginRequired.muestras.info',
	},{
		name : 'Examenes',
		state : 'loginRequired.muestras.examenes({muestra: muestra})',
		id : 'loginRequired.muestras.examenes',
	},{
		name : 'Agregar resultados',
		state : 'loginRequired.muestras.tomadas({muestra: muestra})',
		id : 'loginRequired.muestras.tomadas',
	}
	];

	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});
	
	$http.get('/api/fichas/' + $stateParams.ficha_id).success(function(data) {
		$scope.ficha = data.data;
		$scope.$broadcast('fichaFromMenu', $scope.ficha);
	}).error(function(data) {
		$state.go('loginRequired.index');
	});
});
