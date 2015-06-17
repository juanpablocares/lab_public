(function() {
	var labs = angular.module('lab');

	labs.factory('DetallePagoFicha', function($resource) {
		return $resource("/api/detalles_pago_ficha/:id", {
			id : "@id"
		}, {
			get : {
				method : 'GET',
			},
			update : {
				method : 'PUT',
			},
		});
	});

})();
