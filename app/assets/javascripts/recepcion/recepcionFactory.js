(function() {
	var labs = angular.module('lab');

	labs.factory('Pacientes', ['$resource',
	function($resource) {
		return $resource("/api/pacientes/rut/:rut", { rut: "@rut" },
		{
		  'show':    { method: 'GET', isArray: false },
		  'update_byrut':  { method: 'PUT' },
		  'destroy': { method: 'DELETE' }
		});
	}]);

})();