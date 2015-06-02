(function() {
	var labs = angular.module('lab');

	labs.factory('ProcesadorExamen', function($resource) {
		return $resource("/api/procesadores_examenes/:id", {id: "@id"},
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
