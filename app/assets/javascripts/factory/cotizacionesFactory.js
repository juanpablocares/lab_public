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
			})
		};
	});
	
})();
