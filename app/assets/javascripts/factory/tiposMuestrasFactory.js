(function() {
	var labs = angular.module('lab');

	labs.factory('TiposMuestras', function($resource) {
		return {
			all : $resource("/api/tipos_muestras/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
