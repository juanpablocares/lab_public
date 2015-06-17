angular.module('lab').controller('FacturasMenuController', function($scope, $http, $stateParams, $auth, $state) {

	$scope.state = $state;

	$scope.tabs = [{
		name : 'Asignar',
		state : 'loginRequired.facturas.asignar({})',
		id : 'loginRequired.facturas.asignar',
	},{
		name : 'Todas',
		state : 'loginRequired.facturas.todas({})',
		id : 'loginRequired.facturas.todas',
	}];
});