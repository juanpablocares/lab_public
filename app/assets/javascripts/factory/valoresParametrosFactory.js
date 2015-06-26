(function() {
	var labs = angular.module('lab');

	labs.factory('ValoresParametros', function($resource) {
		return {
			all : $resource("/api/valores_parametros/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
