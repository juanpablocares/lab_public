angular.module('lab').controller('FichasIndexController', function($scope, $auth, $state, $http, $resource, $stateParams, Pacientes) {
		/*
		 * Al recuperar los examenes hay que ordenar los examenes por perfil para que muestre los con perfil primero y luego los examenes sin perfil en orden de codigo
		 */
		
		var mostrarInfoUsuario = true;
		if($stateParams.paciente_id != null)var mostrarInfoUsuario = false;
	});
