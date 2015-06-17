(function() {
	var labs = angular.module('lab');

	labs.factory('Cotizacion', function($resource) {
		return $resource("/api/cotizaciones/:id", {id: "@id"},
			{
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
				new : {
					method: 'POST',
				}
			});
	});
	
})();
