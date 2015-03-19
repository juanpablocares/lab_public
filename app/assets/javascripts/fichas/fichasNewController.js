/**
 * Controlador encargado de la creación de fichas clinicas y cotizaciones.
 */

/*
 Ejemplo de formato de Model "listado"

 Cada vez que en la vista se agreguen examenes, se agregarán de ésta forma al model "listado"
 y luego listado es lo que se enviará a la api, ademas de los datos del paciente

 var asd = {
 perfiles : [{
 id : 1,
 nombre : 'Perfil Biométrico',
 codigo : 'code',
 examenes : [{
 id : 1,
 codigo_fonasa : '0303043',
 nombre : 'Examen1',
 codigo : '0303043',
 externo : true,
 }, {
 id : 4,
 codigo_fonasa : '0303063',
 nombre : 'Examen4',
 codigo : '0303063',
 externo : false,
 }],
 }],
 examenes : [{
 id : 1,
 codigo_fonasa : '0303043',
 nombre : 'Examen1',
 codigo : '0303043',
 externo : true,
 }, {
 id : 4,
 codigo_fonasa : '0303063',
 nombre : 'Examen4',
 codigo : '0303063',
 externo : false,
 }]
 };

 */

angular.module('lab').filter('propsFilter', function() {
	return function(items, props) {
		var out = [];

		if (angular.isArray(items)) {
			items.forEach(function(item) {
				var itemMatches = false;

				var keys = Object.keys(props);
				for (var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
						itemMatches = true;
						break;
					}
				}

				if (itemMatches) {
					out.push(item);
				}
			});
		}
		else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
});
angular.module('lab').controller('FichasNewController', function($scope, $auth, $state, $http, $resource, $stateParams) {
	$scope.person = {};
	$scope.people = [{
		name : 'Adam',
		email : 'adam@email.com',
		age : 12,
		country : 'United States'
	}, {
		name : 'Amalie',
		email : 'amalie@email.com',
		age : 12,
		country : 'Argentina'
	}, {
		name : 'Estefanía',
		email : 'estefania@email.com',
		age : 21,
		country : 'Argentina'
	}, {
		name : 'Adrian',
		email : 'adrian@email.com',
		age : 21,
		country : 'Ecuador'
	}, {
		name : 'Wladimir',
		email : 'wladimir@email.com',
		age : 30,
		country : 'Ecuador'
	}, {
		name : 'Samantha',
		email : 'samantha@email.com',
		age : 30,
		country : 'United States'
	}, {
		name : 'Nicole',
		email : 'nicole@email.com',
		age : 43,
		country : 'Colombia'
	}, {
		name : 'Natasha',
		email : 'natasha@email.com',
		age : 54,
		country : 'Ecuador'
	}, {
		name : 'Michael',
		email : 'michael@email.com',
		age : 15,
		country : 'Colombia'
	}, {
		name : 'Nicolás',
		email : 'nicolas@email.com',
		age : 43,
		country : 'Colombia'
	}];
});
