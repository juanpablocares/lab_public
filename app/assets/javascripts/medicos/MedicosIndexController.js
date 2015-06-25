angular.module('lab').controller('MedicosIndexController', function($scope, $auth, $state, $http, $stateParams, Medico) {

	$scope.isLoading = true;

	$http.get('/api/especialidades').success(function(data) {
		$scope.especialidades = data.especialidades;
	}).error(function(data) {
		// log error
	});
	
	$http.get('/api/instituciones').success(function(data) {
		$scope.instituciones = data.instituciones;
	}).error(function(data) {
		// log error
	});
	
	Medico.get({
		id : $stateParams.medico_id
	}).$promise.then(function(response) {
		console.log('Encontro medico');
		$scope.medico = response.medico;
		$scope.medico.rut_completo = $scope.medico.rut + "-" + $scope.medico.rutdv;
		$scope.isLoading = false;
	}, function(response) {
		console.log("ERROR en get medico");
	});
	
	$scope.guardarDatosMedico = function(medico){
		
		if(medico.especialidad)
			medico.especialidad_id = medico.especialidad.id;
		else
			medico.especialidad_id = null;
		
		if(medico.institucion)
			medico.institucion_id = medico.institucion.id;
		else
			medico.institucion_id = null;
		
		Medico.update({
			id : medico.id
		}, medico).$promise.then(function(response) {
			console.log(response);
			$state.go('loginRequired.medicos.search');
		}, function(response) {
			console.log("ERROR en update medico");
		});
		
		console.log('Guardar médico');
	};
	
	$scope.cambiarVentanaSinCambios = function(){
		console.log('Volver');
	};
	
});
