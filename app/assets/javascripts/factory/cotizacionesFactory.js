(function() {
	var labs = angular.module('lab');

	labs.factory('Cotizacion', function($resource) {
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
