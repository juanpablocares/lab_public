(function() {
	var labs = angular.module('lab');

	labs.factory('ValorParametro', function($resource) {
		return $resource("/api/valores_parametros/:id", {id: "@id"},
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
				new : {
					method: 'POST',
				}
			});
	});
	
})();
