angular.module('lab').controller('RecepcionController', [
	'$scope', '$http',
		function($scope, $http)
		{
			$scope.valido = false;
			$scope.rut = 0;
			$scope.edad = 0;
			$scope.firstName = 'Juan';
			$scope.secondName = 'Pablo';
		
			$scope.saveRut = function(value, valido){
				if(valido){
					$scope.rut = value;
					$scope.valido = true;
					$scope.myrut = null;
				}
			}
		
			$scope.calculateAge = function calculateAge(birthday) { // birthday is a date
				var dateBirthday = new Date(birthday);
				console.log(dateBirthday.getTime());
				var ageDifMs = Date.now() - dateBirthday.getTime();
				var ageDate = new Date(ageDifMs); // miliseconds from epoch
				$scope.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
				return Math.abs(ageDate.getUTCFullYear() - 1970);
			}
		
			$scope.getFullName = function()
			{
				return $scope.firstName + " " + $scope.secondName;
			}
			
			$http.get('previsiones').
				success(function(data) {
					$scope.plans = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('regiones').
				success(function(data) {
					$scope.regions = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('users').
				success(function(data) {
					$scope.ruts = data;
				}).
				error(function(data) {
					// log error
				});
		}
	]);