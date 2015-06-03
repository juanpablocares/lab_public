(function() {
	var labs = angular.module('lab');

	labs.factory('TipoEnvase', function($resource) {
		return $resource("/api/tipos_envase/:id", {id: "@id"},
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
