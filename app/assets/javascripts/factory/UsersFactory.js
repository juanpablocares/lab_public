(function() {
	var labs = angular.module('lab');

	labs.factory('Users', function($resource) {
		return {
			all : $resource("/api/users/", {
			}, {
				update : {
					method : 'PUT',
				},
				get : {
					method : 'GET',
				},
			}),
		};
	});
	
})();
