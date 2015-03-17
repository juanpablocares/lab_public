angular.module('lab').controller('PacientesFichasController', ['$scope', '$stateParams', 'Fichas', '$http', function($scope, $stateParams, Fichas, $http) {

	$scope.isData = false;
	
	$http.get('/api/fichas/paciente/' + $stateParams.paciente_id).success(function(data) {
		$scope.rowCollection = data.fichas;
		
		if(data.fichas.length == 0){
			$scope.isData = false;
		}
		else{
			$scope.isData = true;
			}

	}).error(function(data) {
		$state.go('loginRequired.index');
	});
	
	console.log($scope.isData);
}]);
