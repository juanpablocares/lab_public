(function() {
	var labs = angular.module('lab');

	labs.factory('ModificacionExamen', function($resource) {
		return $resource("/api/modificacion_examenes/:id", {id: "@id"},
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
