(function() {
	var labs = angular.module('lab');

	labs.factory('Pacientes', function($resource) {
		return {
			all : $resource("/api/pacientes", {
			}, {
				'index' : {
					method : 'GET',
					isArray : true
				}
			}),
			range : $resource("/api/pacientes/range/:start/:number", {
				start : "@start",
				number : "@number",
			},
			{
				advanced : {
					method : 'POST',
					isArray: false,
				}
			}),
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
				all : {
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
				'update' : {
					method : 'PUT'
				},
			})
		};
	});
})();
