(function() {
	var labs = angular.module('lab');

	labs.factory('Medico', function($resource) {
		return $resource("/api/medicos/:id", {id: "@id"},
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
