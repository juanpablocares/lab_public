angular.module('lab').controller('NavBarController', function($rootScope, $state, $scope, $auth, $stateParams, Pacientes) {

	$scope.searchForm = {};
	$scope.paciente = {};

	$scope.showTempForm = function() {
		$scope.showSearchTempForm = true;
		$scope.showSearchTextForm = false;
		$scope.showSearchRutForm = false;
	}

	$scope.showTextForm = function() {
		$scope.showSearchTempForm = false;
		$scope.showSearchTextForm = true;
		$scope.showSearchRutForm = false;
	}

	$scope.showRutForm = function() {
		$scope.showSearchTempForm = false;
		$scope.showSearchTextForm = false;
		$scope.showSearchRutForm = true;
	}

	$scope.showTempForm();

	$scope.$watch('searchForm.valor', function(newValue, oldValue) {
		$scope.checkSearchInput(newValue);
		$scope.checkEmptySearchInput(newValue);
	});

	$scope.$watch('searchForm.rut_value', function(newValue, oldValue) {
		$scope.checkEmptySearchInput(newValue);
	});

	$scope.$watch('searchForm.text_value', function(newValue, oldValue) {
		$scope.checkEmptySearchInput(newValue);
	});

	$scope.checkSearchInput = function(value) {
		if (value != null && value.length != 0) {
			if (!isNaN(value)) {
				$scope.searchForm.rut_value = value;
				$scope.searchForm.valor = null;
				$scope.showRutForm();
				document.getElementById('searchBoxTemp').onblur = function() {
					var tempInput = document.getElementById('searchBoxRut');
					tempInput.focus();
				};
			}
			else {
				$scope.searchForm.text_value = value;
				$scope.searchForm.valor = null;
				$scope.showTextForm();
				document.getElementById('searchBoxTemp').onblur = function() {
					var tempInput = document.getElementById('searchBoxText');
					tempInput.focus();
				};
			}
		}
	};

	$scope.checkEmptySearchInput = function(value) {
		if (value == "" || value === undefined) {
			$scope.searchForm.text_value = null;
			$scope.searchForm.rut_value = null;
			$scope.showTempForm();
			var tempInput = document.getElementById('searchBoxTemp');
			tempInput.focus();
		}
	};

	$scope.searchByRut = function(value) {
		$scope.searchForm.rut_value = "";
		$scope.searchFormTemp.$setPristine();
		$state.go('loginRequired.busqueda_paciente', { 
			rut_completo : value
		});
	};

	$scope.searchByText = function(value) {
		$scope.searchForm.text_value = "";
		$scope.searchFormTemp.$setPristine();
		$state.go('loginRequired.busqueda_paciente', {
			text : value
		});
	};
});
