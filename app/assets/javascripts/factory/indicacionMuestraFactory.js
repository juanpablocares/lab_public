(function() {
	var labs = angular.module('lab');

	labs.factory('IndicacionMuestra', function($resource) {
		return $resource("/api/indicaciones_muestra/:id", {id: "@id"},
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
