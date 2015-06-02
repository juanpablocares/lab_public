(function() {
	var labs = angular.module('lab');

	labs.factory('ProcesadoresExamenes', function($resource) {
		return {
			all : $resource("/api/procesadores_examenes/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
