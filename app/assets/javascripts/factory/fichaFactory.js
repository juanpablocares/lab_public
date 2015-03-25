(function() {
	var labs = angular.module('lab');

	labs.factory('Ficha', function($resource) {
		return $resource("/api/fichas/:id", {id: "@id"},
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
