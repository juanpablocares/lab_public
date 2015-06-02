(function() {
	var labs = angular.module('lab');

	labs.factory('TipoMuestra', function($resource) {
		return $resource("/api/tipos_muestras/:id", {id: "@id"},
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
