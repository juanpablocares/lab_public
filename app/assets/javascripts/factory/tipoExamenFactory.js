(function() {
	var labs = angular.module('lab');

	labs.factory('TipoExamen', function($resource) {
		return $resource("/api/tipo_examenes/:id", {id: "@id"},
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
