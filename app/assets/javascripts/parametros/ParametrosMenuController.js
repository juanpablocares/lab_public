angular.module('lab').controller('ParametrosMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Color Orina',
		state : 'loginRequired.parametros.color_orina({parametro_id: 1})',
		id : 'loginRequired.parametros.color_orina',
	},{
		name : 'Procesador',
		state : 'loginRequired.otros.procesadores({})',
		id : 'loginRequired.otros.procesadores',
	},];
});