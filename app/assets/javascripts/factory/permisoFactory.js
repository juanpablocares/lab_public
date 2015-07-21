(function() {
	var labs = angular.module('lab');

	labs.factory('Permiso', function($resource) {
		return $resource("/api/permisos/:id", {id: "@id"},
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
