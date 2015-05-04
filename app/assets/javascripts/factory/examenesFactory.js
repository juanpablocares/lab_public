(function() {
	var labs = angular.module('lab');

	labs.factory('Examenes', function($resource) {
		return {
			all : $resource("/api/examenes", {
			}, {
				'index' : {
					method : 'GET',
				},
				'update' : {
					method : 'PUT'
				}
			}),
			filtrar_tarifas: $resource("/api/examenes/filtrar_tarifas/:tarifa_id", {
				tarifa_id : "@tarifa_id",
			}, {
				get : {
					method : 'GET',
					isArray : false
				},
			}),
			range : $resource("/api/examenes/range/:start/:number", {
				start : "@start",
				number : "@number",
			},
			{
				advanced : {
					method : 'POST',
					isArray: false,
				}
			}),
			buscar : $resource("/api/examenes", {
			}, {
				todos : {
					method : 'GET',
					isArray: false,
				},
			})
		};
	});
})();