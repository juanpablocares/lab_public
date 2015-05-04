(function() {
	var labs = angular.module('lab');

	labs.factory('TarifaExamen', function($resource) {
		return $resource("/api/tarifas_examen/:id", {id: "@id"},
			{
				get : {
					method : 'GET',
				},
				update : {
					method : 'PUT',
				},
			});
	});
	
})();
