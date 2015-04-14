angular.module('lab').controller('FichasMenuController', function($scope, $http, $stateParams, $auth, $state, Ficha) {

	if($stateParams.ficha_id==null)$state.go('loginRequired.busqueda_ficha');
	$scope.state = $state;

	$scope.tabs = [{
		name : 'Información',
		state : 'loginRequired.fichas.info()',
		id : 'loginRequired.fichas.info',
	}, {
		name : 'Pagos',
		state : 'loginRequired.fichas.pagos()',
		id : 'loginRequired.fichas.pagos',
	}, {
		name : 'Examenes',
		state : 'loginRequired.fichas.examenes()',
		id : 'loginRequired.fichas.examenes',
	}];

	Ficha.get({
		id : $stateParams.ficha_id
	}, function(datos) {
		$scope.ficha = datos.data;
		$scope.mandarFicha();
	});
	$scope.$on('fichaFromEdit', function(event, data) {
		$scope.ficha = data;
	});

	$scope.$on('PedirFichaFromMenu', function(event, data) {
		$scope.mandarFicha();
	});

	$scope.mandarFicha = function()
	{
		console.log("Mandar ficha desde menu");
		$scope.$broadcast('fichaFromMenu', $scope.ficha);
	}
});