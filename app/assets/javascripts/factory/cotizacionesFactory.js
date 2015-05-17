(function() {
	var labs = angular.module('lab');

	labs.factory('Cotizaciones', function($resource) {
		return {
			root : $resource("/api/cotizaciones", {
			}, {
				new : {
					method : 'POST',
					isArray: false,
				},
			})
		};
	});
	
})();
