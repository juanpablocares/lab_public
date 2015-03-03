angular.module('lab').controller('RecepcionController', [
	'$scope', '$resource', '$http', 'Pacientes',
		function($scope, $resource, $http, Pacientes)
		{
			$scope.tipo = 0;
			$scope.valido = false;
			$scope.rut = 0;
			$scope.rutdv = 0;
			$scope.edad = 'Ingrese fecha';
			$scope.nombres = '';
			$scope.paterno = '';
			$scope.materno = '';
			$scope.celular = 0;
			$scope.direccion = '';
			$scope.region = '';
			$scope.fechaNacimiento = new Date();
			$scope.genero = '';
			$scope.prevision = '';
			$scope.diagnostico = '';
			
			$scope.clean = function(){
				$scope.valido = false;
				$scope.rut = 0;
				$scope.rutdv = 0;
				$scope.edad = 'Ingrese fecha';
				$scope.nombres = '';
				$scope.paterno = '';
				$scope.materno = '';
				$scope.celular = 0;
				$scope.direccion = '';
				$scope.region = '';
				$scope.fechaNacimiento = new Date();
				$scope.genero = '';
				$scope.prevision = '';
				$scope.diagnostico = '';
			}
		
			$scope.saveRut = function(value, valido){
				if(valido){
					$scope.valido = true;
					$scope.rut = value;
					$scope.rutdv = parseInt(value % 10);
					$scope.myrut = null;
					//console.log(parseInt(value % 10));
					Pacientes.show({rut: parseInt(value/10)}, function(datos){
						if(datos.rut == null){
							$scope.tipo = 1;
						}
						else{
							$scope.tipo = 2;
							$scope.nombres = datos.nombre;
							$scope.paterno = datos.apellido_paterno;
							$scope.materno = datos.apellido_materno;
							$scope.celular = datos.celular;
						}
					});
				}
			}
		
			$scope.storeData = function(value){
			
				var Paciente = $resource('/api/pacientes');
				var nuevoPaciente = new Paciente();
				nuevoPaciente.rut = parseInt(($scope.rut) / 10);
				nuevoPaciente.rutdv = $scope.rutdv;
				nuevoPaciente.nombre = $scope.nombres;
				nuevoPaciente.apellido_paterno = $scope.paterno;
				nuevoPaciente.apellido_materno = $scope.materno;
				nuevoPaciente.celular = $scope.celular;
				nuevoPaciente.direccion = $scope.direccion;
				nuevoPaciente.comuna_id = $scope.comuna.id;
				nuevoPaciente.fecha_nacimiento = $scope.fechaNacimiento;
				if($scope.genero == 'masculino')
					nuevoPaciente.genero = 1;
				else
					nuevoPaciente.genero = 2;
				nuevoPaciente.diagnostico = $scope.diagnostico;
				nuevoPaciente.prevision_id = $scope.prevision.id;
				nuevoPaciente.user_id = 9;
				console.log(nuevoPaciente);
				nuevoPaciente.$save();
			}
		
			$scope.calculateAge = function calculateAge(birthday) { // birthday is a date
				var dateBirthday = new Date(birthday);
				var ageDifMs = Date.now() - dateBirthday.getTime();
				var ageDate = new Date(ageDifMs); // miliseconds from epoch
				$scope.edad = Math.abs(ageDate.getUTCFullYear() - 1970);
				return Math.abs(ageDate.getUTCFullYear() - 1970);
			}
			
			$http.get('/api/previsiones').
				success(function(data) {
					$scope.plans = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('/api/regiones').
				success(function(data) {
					$scope.regions = data;
				}).
				error(function(data) {
					// log error
				});
			
			$http.get('/api/comunas').
				success(function(data) {
					$scope.comuns = data;
				}).
				error(function(data) {
					// log error
				});
		}
	]);