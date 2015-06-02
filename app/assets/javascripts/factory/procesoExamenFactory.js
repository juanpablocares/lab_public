(function() {
	var labs = angular.module('lab');

	labs.factory('ProcesoExamen', function($resource) {
		return $resource("/api/proceso_examenes/:id", {id: "@id"},
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
