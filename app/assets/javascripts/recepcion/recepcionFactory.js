(function() {
	var labs = angular.module('lab');

	labs.factory('Pacientes', function($resource) {
		return {
			by_rut : $resource("/api/pacientes/rut/:rut", {
				rut : "@rut"
			}, {
				'show' : {
					method : 'GET',
					isArray : false
				},
				'update' : {
					method : 'PUT'
				},
				'destroy' : {
					method : 'DELETE'
				}
			}),
			buscar : $resource("/api/pacientes/buscar/:valor", {
				valor : "@valor"
			}, {
				by_rut : {
					method : 'GET',
					isArray: false,
				},
				by_text : {
					method : 'GET',
					isArray: true,
				}
			}),
			by_paciente : $resource("/api/fichas/paciente/:id", {
				id : "@id"
			}, {
				'show_bypaciente' : {
					method : 'GET',
					isArray : true
				},
			})
		};
	});
})();
