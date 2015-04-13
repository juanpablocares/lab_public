(function() {
	var labs = angular.module('lab');

	labs.factory('DetallesFicha', function($resource) {
		return {
			root : $resource("/api/detalles_ficha/", {
			}, {
				new : {
					method : 'POST',
					isArray : false,
				},
				get : {
					method : 'GET',
				},
			}),
			muestras_tomadas : $resource("/api/detalles_ficha/muestras_tomadas/:start/:number", {
				start : "@start",
				number : "@number",
			}, {
				advanced : {
					method : 'POST',
					isArray : false,
				}
			}),
			id : $resource("/api/detalles_ficha/:id", {
				id : '@id'
			}, {
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
			}),
			by_paciente : $resource("/api/detalles_ficha/paciente/:id/:start/:number", {
				id : '@id',
				start : "@start",
				number : "@number",
			}, {
				get : {
					method : 'GET',
				},
			}),
		};
	});

})();
