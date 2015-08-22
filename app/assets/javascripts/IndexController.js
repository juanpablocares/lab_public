angular.module('lab').controller('IndexController',
function($scope, Pacientes, Medicos, 
	medicosService, Examenes, examenesService, Previsiones,
	 previsionesService, Procedencias, procedenciasService, 
	 Perfiles, perfilesService) {

	$scope.linkList = [];
	/*
	$scope.linkList.push({
		name: '',		//nombre para el objeto
		text: '',		//Texto a mostrar en el objeto, usar prefijo link
		url: '',		//url desde el index sin slash inicial
		ui_ref: '',		//loginRequired.bla
		icon: '',		//si es fa-user, usar sólo user.
		iconRaw: '',	//si el ícono es mas complejo, ingresar el html
		parametros: {}	//en caso de necesitar parametros
	});
	*/

	$scope.linkList.push({
		name: 'link-pacientes',
		text: 'Pacientes',
		url: '',
		ui_ref: 'loginRequired.busqueda_paciente',
		icon: 'user',
		iconRaw: '',
	});

	$scope.linkList.push({
		name: 'link-fichas',
		text: 'Fichas',
		url: '',
		ui_ref: 'loginRequired.busqueda_ficha',
		icon: 'file-text-o',
		iconRaw: '',
	});

	$scope.linkList.push({
		name: 'link-examenes',
		text: 'Examenes',
		url: '',
		ui_ref: 'loginRequired.busqueda_examen',
		icon: 'heartbeat',
		iconRaw: '',
	});

	$scope.linkList.push({
		name: 'link-muestra',
		text: 'Muestras',
		url: '',
		ui_ref: 'loginRequired.busqueda_muestras',
		icon: 'stethoscope',
		iconRaw: '',
	});

	$scope.linkList.push({
		name: 'link-ingreso-resultados',
		text: 'Ingreso de resultados',
		url: '',
		ui_ref: 'loginRequired.busqueda_ingreso_resultados',
		icon: 'edit',
		iconRaw: '',
	});

	$scope.linkList.push({
		name: 'link-muestra',
		text: 'Muestras',
		url: '',
		ui_ref: 'loginRequired.busqueda_muestras',
		icon: 'stethoscope',
		iconRaw: '',
	});
	$scope.linkList.push({
		name: 'link-muestra',
		text: 'Muestras',
		url: '',
		ui_ref: 'loginRequired.busqueda_muestras',
		icon: 'stethoscope',
		iconRaw: '',
	});
	$scope.linkList.push({
		name: 'link-muestra',
		text: 'Muestras',
		url: '',
		ui_ref: 'loginRequired.busqueda_muestras',
		icon: 'stethoscope',
		iconRaw: '',
	});


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