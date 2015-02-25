angular.module('lab').controller('CuentaIndexController', ['$scope', '$auth', '$state', '$http', function($scope, $auth, $state, $http) {
	$scope.user.editing = false;
	$http.get('/api/users/accountAttributes').success(function(data, status, headers, config) {
		$scope.user.attributes = data;
	}).error(function(data, status, headers, config) {
		$scope.user.error = true;
	});
}]);
