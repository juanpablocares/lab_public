(function() {
	var labs = angular.module('lab');

	labs.factory('Examen', function($resource) {
		return $resource("/api/examenes/:id", {id: "@id"},
			{
				update : {
					method : 'PUT',
				},
			});
	});
	
})();
