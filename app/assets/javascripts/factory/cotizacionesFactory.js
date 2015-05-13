(function() {
	var labs = angular.module('lab');

	labs.factory('Cotizaciones', function($resource) {
		return {
			root : $resource("/api/cotizacion", {
			}, {
				new : {
					method : 'POST',
					isArray: false,
				},
			}),
			by_paciente : $resource("/api/cotizaciones/paciente/:id", {
				id : "@id",
			}, {
				paciente_id : {
					method : 'GET',
					isArray : false
				},
			}),
		};
	});
	
})();
