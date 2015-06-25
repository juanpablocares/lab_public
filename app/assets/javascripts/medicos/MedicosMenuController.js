angular.module('lab').controller('MedicosMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Búsqueda',
		state : 'loginRequired.medicos.search',
		id : 'loginRequired.medicos.search',
	},{
		name : 'Nuevo',
		state : 'loginRequired.medicos.nuevo',
		id : 'loginRequired.medicos.nuevo',
	}];
	
});