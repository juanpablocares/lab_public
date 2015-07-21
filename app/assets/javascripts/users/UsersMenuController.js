angular.module('lab').controller('UsersMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Todos',
		state : 'loginRequired.users.editar',
		id : 'loginRequired.users.editar',
	},{
		name : 'Permisos',
		state : 'loginRequired.users.permisos',
		id : 'loginRequired.users.permisos',
	},{
		name : 'Nuevo',
		state : 'loginRequired.users.nuevo',
		id : 'loginRequired.users.nuevo',
	}];
	
});