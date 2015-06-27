(function() {
	var labs = angular.module('lab');

	labs.factory('ExamenParametro', function($resource) {
		return $resource("/api/examenes_parametros/:id", {id: "@id"},
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
