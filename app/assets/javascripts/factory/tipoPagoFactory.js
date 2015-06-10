(function() {
	var labs = angular.module('lab');

	labs.factory('TipoPago', function($resource) {
		return $resource("/api/tipos_pago/:id", {id: "@id"},
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
