angular.module('lab').controller('MedicosNuevoController', function($scope, $auth, $state, $http, $stateParams, Medico) {

	$scope.medico = {};

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
	
	$scope.guardarDatosMedico = function(medico){
		
		if(medico.rut_completo != null){
			
			medico.rut = parseInt(medico.rut_completo / 10);
			medico.rutdv = parseInt(medico.rut_completo % 10);
			
			console.log(medico.rut);
			console.log(medico.rutdv);
			
			if(medico.especialidad)
				medico.especialidad_id = medico.especialidad.id;
			else
				medico.especialidad_id = null;
			
			if(medico.institucion)
				medico.institucion_id = medico.institucion.id;
			else
				medico.institucion_id = null;
			
			Medico.new(medico).$promise.then(function(response) {
				console.log('Medico creado');
				$state.go('loginRequired.medicos.search');
			}, function(response) {
				console.log("ERROR creando medico");
			});
		}
	};
	
	$scope.cambiarVentanaSinCambios = function(){
		$state.go('loginRequired.medicos.search');
	};
	
});
