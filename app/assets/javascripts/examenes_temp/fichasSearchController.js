(function() {
	angular.module('lab').controller('FichasSearchController', function($scope, $auth, $state, $http, $stateParams, Fichas) {

		$scope.resultadosBusqueda = null;

		$scope.displayed = [];

		$scope.callServer = function callServer(tableState) {

			$scope.isLoading = true;

			var pagination = tableState.pagination;

			var start = pagination.start || 0;
			// This is NOT the page number, but the index of item in the list that you want to use to display the table.
			var number = pagination.number || 10;
			// Number of entries showed per page.

			Fichas.search.advanced({
				start : start,
				number : number
			}, tableState).
			$promise.then(function(result) {
				$scope.displayed = result.data;
				tableState.pagination.numberOfPages = result.numberOfPages;
				//set the number of pages so the pagination can update
				$scope.isLoading = false;
			});
		};

	});
})();
