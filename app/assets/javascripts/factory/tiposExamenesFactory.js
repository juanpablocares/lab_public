(function() {
	var labs = angular.module('lab');

	labs.factory('TiposExamenes', function($resource) {
		return {
			all : $resource("/api/tipo_examenes/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
