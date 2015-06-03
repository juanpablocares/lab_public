(function() {
	var labs = angular.module('lab');

	labs.factory('TiposEnvases', function($resource) {
		return {
			all : $resource("/api/tipos_envase/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
