(function() {
	var labs = angular.module('lab');

	labs.factory('DetallesPagoFicha', function($resource) {
		return {
			root : $resource("/api/detalles_pago_ficha", {
			}, {
				new : {
					method : 'POST',
					isArray : false,
				},
			}),
			by_ficha_id : $resource("/api/detalles_pago_ficha/ficha/:id", {
				id : '@id'
			}, {
				all : {
					method : 'GET',
					isArray : false
				},
			}),
		};
	});
})();