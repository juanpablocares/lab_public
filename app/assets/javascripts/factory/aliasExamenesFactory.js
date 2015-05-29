(function() {
	var labs = angular.module('lab');

	labs.factory('AliasExamenes', function($resource) {
		return {
			all : $resource("/api/alias_examenes/", {
			}, {
				update : {
					method : 'PUT',
				},
			}),
		};
	});
	
})();
