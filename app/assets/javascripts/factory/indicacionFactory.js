(function() {
	var labs = angular.module('lab');

	labs.factory('Indicacion', function($resource) {
		return $resource("/api/indicaciones/:id", {id: "@id"},
			{
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
				save : {
					method : 'POST',
				},
				delete : {
					method : 'DELETE',
				},
			});
	});
	
})();
