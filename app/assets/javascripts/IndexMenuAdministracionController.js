angular.module('lab').controller('IndexMenuAdministracionController',
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
		name: 'link-facturas',
		text: 'Liquidaciones y cobranzas',
		ui_ref: 'loginRequired.facturas.asignar',
		icon: 'file-text-o',
		class: 'list-group-item-danger'
	});
	
	$scope.linkList.push({
		name: 'link-estadisticas',
		text: 'Estadísticas',
		ui_ref: 'loginRequired.estadisticas.fichas',
		icon: 'pie-chart',
		class: 'list-group-item-danger'
	});
	
	$scope.linkList.push({
		name: 'link-otros',
		text: 'Otros',
		ui_ref: 'loginRequired.otros.procesos',
		icon: 'cogs',
		class: 'list-group-item-danger'
	});
	
});