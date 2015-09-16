angular.module('lab').controller('IndexMenuConfiguracionController',
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
		name: 'link-examenes',
		text: 'Examenes',
		ui_ref: 'loginRequired.busqueda_examen',
		icon: 'heartbeat',
	});

	$scope.linkList.push({
		name: 'link-usuarios',
		text: 'Usuarios',
		ui_ref: 'loginRequired.users.editar',
		icon: 'users',
		class: 'list-group-item-danger'
	});
	
});