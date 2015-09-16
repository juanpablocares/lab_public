angular.module('lab').controller('IndexMenuConsultasController',
function($scope) {

	$scope.linkList = [];
	/*
	$scope.linkList.push({
		name: '',		//nombre para el objeto
		text: '',		//Texto a mostrar en el objeto, usar prefijo link
		url: '',		//url desde el index sin slash inicial
		ui_ref: '',		//loginRequired.bla
		icon: '',		//si es fa-user, usar sólo user.
		iconRaw: '',	//si el ícono es mas complejo, ingresar el html
		class: '',		//en caso de necesitar agregar clase al objeto completo
		parametros: {}	//en caso de necesitar parametros
	});
	*/
	
	$scope.linkList.push({
		name: 'link-fichas',
		text: 'Fichas',
		ui_ref: 'loginRequired.busqueda_ficha',
		icon: 'file-text-o',
	});
	
	$scope.linkList.push({
		name: 'link-cotizaciones',
		text: 'Cotizaciones',
		ui_ref: 'loginRequired.busqueda_cotizaciones',
		icon: 'file-text-o',
	});
	
	$scope.linkList.push({
		name: 'link-pacientes',
		text: 'Pacientes',
		ui_ref: 'loginRequired.busqueda_paciente',
		icon: 'user',
	});

	$scope.linkList.push({
		name: 'link-examenes',
		text: 'Examenes',
		ui_ref: 'loginRequired.busqueda_examen_visual',
		icon: 'heartbeat',
	});


	$scope.linkList.push({
		name: 'link-medicos',
		text: 'Médicos',
		ui_ref: 'loginRequired.medicos.search',
		icon: 'heartbeat',
	});
	
});