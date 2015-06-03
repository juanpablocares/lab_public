angular.module('lab').controller('FichasMenuController', function($scope, $http, $stateParams, $auth, $state, Ficha) {
	if ($stateParams.ficha_id == null)
		$state.go('loginRequired.busqueda_ficha');
}); 
