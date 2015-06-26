(function() {
	var labs = angular.module('lab');

	labs.factory('Especialidades', function($resource) {
		return {
			all : $resource("/api/especialidades/update_all/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
