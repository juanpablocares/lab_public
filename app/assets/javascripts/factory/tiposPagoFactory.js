(function() {
	var labs = angular.module('lab');

	labs.factory('TiposPagos', function($resource) {
		return {
			all : $resource("/api/tipos_pago/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
