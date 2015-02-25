angular.module('lab').controller('CuentaMenuController', function($scope, $auth, $state) {
	$scope.state = $state;
	$scope.tabs = [{
		name : 'Información personal',
		id : 'loginRequired.account.info'
	},
	{
		name : 'Cambiar contraseña',
		id : 'loginRequired.account.changePassword'
	},
	{
		name : 'Mensajes',
		badge: 10,
		id : 'loginRequired.account.messages'
	},
	{
		name : 'Registro de actividades',
		id : 'loginRequired.account.log'
	}];
});
