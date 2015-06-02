(function() {
	var labs = angular.module('lab');

	labs.factory('ProcesosExamenes', function($resource) {
		return {
			all : $resource("/api/proceso_examenes/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
