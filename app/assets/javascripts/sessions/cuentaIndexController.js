angular.module('lab').controller('CuentaIndexController', function($scope, $auth, $state) {
	$scope.user.editing = false;
	$scope.user.attributes = [{
		name : 'Rut',
		value : '12.312.312-3',
		editable : false,
		type : 'text',
	}, {
		name : 'Nombre',
		value : 'Carlos Benner B.',
		editable : false,
		type : 'text',
	}, {
		name : 'Email',
		value : 'email@email.com',
		editable : false,
		type : 'email',
	}, {
		name : 'Dirección',
		value : 'Calle falsa 123',
		editable : true,
		type : 'text',
	}, {
		name : 'Teléfono',
		value : '123123123',
		editable : true,
		type : 'text',
	}];
});
