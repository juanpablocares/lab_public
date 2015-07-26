angular.module('lab').controller('RecepcionController',
function($scope, $auth, $resource, $http, Pacientes, $state, Medicos, 
	medicosService, Examenes, examenesService, Previsiones,
	 previsionesService, Procedencias, procedenciasService, 
	 Perfiles, perfilesService) {
	if(!medicosService.getMedicos())
	{
		Medicos.buscar.todos().$promise.then(function(data) {
			medicosService.setMedicos(data.data);
		}, function(response) {
			console.log("ERROR obteniendo medicos");
		});
	}
	if(!examenesService.getExamenes())
	{
		Examenes.all.index({
		}).$promise.then(function(data) {
			examenesService.setExamenes(data.data);
		}, function(response) {
			console.log("ERROR obteniendo examenes");
		});
	}
	if(!previsionesService.getPrevisiones())
	{
		Previsiones.all.get().$promise.then(function(data) {
			previsionesService.setPrevisiones(data.previsiones);
		}, function(data) {
			console.log('Error getting previsiones');
		});
	}
	if(!perfilesService.getPerfiles())
	{
		Perfiles.buscar.todos().$promise.then(function(data) {
			perfilesService.setPerfiles(data.data);
		}, function(data) {
			console.log('Error getting perfiles');
		});
	}
	if(!procedenciasService.getProcedencias())
	{
		Procedencias.buscar.todos().$promise.then(function(data) {
			procedenciasService.setProcedencias(data.data);
		}, function(data) {
			console.log('Error getting procedencias');
		});
	}
});