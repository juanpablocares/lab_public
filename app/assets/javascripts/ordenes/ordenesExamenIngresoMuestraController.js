angular.module('lab').controller('OrdenesExamenIngresoMuestraController', function($scope, $auth, $state, $http, $stateParams, DetalleFicha, DetallesFicha) {

	if ($stateParams.detalle_ficha_id == null)
		$state.go('loginRequired.index');

	$scope.detalleFicha = {};

	//Recobrar ficha desde el menu
	$scope.$on('detalleFichaFromMenu', function(event, data) {
		if (data != undefined) {
			$scope.detalleFicha = data;
			console.log(data);
		}
	});
	$scope.$emit('PedirDetalleFichaFromMenu');

	$scope.cambiarEstadoBoton = function(id) {
		console.log("cambiar estado boton");
		
		estado = $scope.detalleFicha.estado;

		$scope.detalleFicha.estado.class = 'info';
		$scope.detalleFicha.estado.texto = 'Cargando';

		DetalleFicha.get({
			id : id
		}).$promise.then(function(results) {
			tmp = results.data;
			
			if(tmp.usuario_muestra_id == null)
			{
				tmp.fecha_muestra = Date();
				tmp.usuario_muestra_id = $auth.user.id;
			}
			else
			{
				tmp.fecha_muestra = null;
				tmp.usuario_muestra_id = null;
			}
			
			DetallesFicha.id.update({
				id : id
			}, tmp).$promise.then(function(results)
			{
				if(results.data.usuario_muestra_id != null)
				{
					$scope.detalleFicha.estado.class = 'success';
					$scope.detalleFicha.estado.texto = 'Toma de muestra realizada';
				}
				else
				{
					$scope.detalleFicha.estado.class = 'warning';
					$scope.detalleFicha.estado.texto = 'Toma de muestra pendiente';
				}
			}).catch(function(results){
				$scope.detalleFicha.estado = estado;
			});
		});
	}
});
