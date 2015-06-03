(function() {
	var labs = angular.module('lab');

	labs.factory('IndicacionesMuestras', function($resource) {
		return {
			all : $resource("/api/indicaciones_muestra/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
