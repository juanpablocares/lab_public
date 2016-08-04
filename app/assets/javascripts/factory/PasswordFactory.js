(function() {
	var labs = angular.module('lab');

	labs.factory('Password', function($resource) {
		return $resource("/auth/validar_password", {password: "@id"},
			{
				validarPassword : {
					method : 'POST',
				}
			});
	});
	
})();
