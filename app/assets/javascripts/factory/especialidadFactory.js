(function() {
	var labs = angular.module('lab');

	labs.factory('Especialidad', function($resource) {
		return $resource("/api/especialidades/:id", {id: "@id"},
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
