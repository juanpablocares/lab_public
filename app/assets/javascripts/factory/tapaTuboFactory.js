(function() {
	var labs = angular.module('lab');

	labs.factory('TapaTubo', function($resource) {
		return $resource("/api/tapas_tubo/:id", {id: "@id"},
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
