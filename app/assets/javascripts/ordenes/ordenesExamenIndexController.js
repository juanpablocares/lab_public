angular.module('lab').controller('OrdenesExamenIndexController', function($scope, $auth, $state, $http, $stateParams) {

	if ($stateParams.detalle_ficha_id == null)
		$state.go('loginRequired.index');

	$scope.detalleFicha = {};
	
	//Recobrar ficha desde el menu
	$scope.$on('detalleFichaFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.detalleFicha = data;
		}
	});
	$scope.$emit('PedirDetalleFichaFromMenu');
	
	

});
