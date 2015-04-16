(function() {
	var labs = angular.module('lab');

	labs.factory('Tarifa', function($resource) {
		return $resource("/api/tarifas/:id", {id: "@id"},
			{
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
			});
	});
	
})();
