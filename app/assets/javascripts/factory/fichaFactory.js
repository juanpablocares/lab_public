(function() {
	var labs = angular.module('lab');

	labs.factory('Ficha', function($resource) {
		return $resource("/api/fichas/show/:id", {id: "@id"},
			{
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
					url: 'api/fichas/update/:id',
					params: {id: "@id"}
				},
				new : {
					method: 'POST',
					url: 'api/fichas/new/',
				}
			});
	});
	
})();
