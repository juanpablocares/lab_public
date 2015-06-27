(function() {
	var labs = angular.module('lab');

	labs.factory('ExamenesParametros', function($resource) {
		return {
			all : $resource("/api/examenes_parametros/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
