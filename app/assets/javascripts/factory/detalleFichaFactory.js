(function() {
	var labs = angular.module('lab');

	labs.factory('DetalleFicha', function($resource) {
		return $resource("/api/detalles_ficha/:id", {
			id : "@id"
		}, {
			get : {
				method : 'GET',
			},
			update : {
				method : 'PUT',
			},
		});
	});

})();
