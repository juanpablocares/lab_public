(function() {
	var labs = angular.module('lab');

	labs.factory('Prevision', function($resource) {
		return $resource("/api/previsiones/:id", {id: "@id"},
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
