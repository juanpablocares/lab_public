(function() {
	var labs = angular.module('lab');

	labs.factory('Institucion', function($resource) {
		return $resource("/api/instituciones/:id", {id: "@id"},
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
				new : {
					method: 'POST',
				}
			});
	});
	
})();
