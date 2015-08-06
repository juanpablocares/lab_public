(function() {
	var labs = angular.module('lab');

	labs.directive('format', ['$filter',
	function($filter) {
		return {
			require : '?ngModel',
			link : function(scope, elem, attrs, ctrl) {
				if (!ctrl)
					return;

				ctrl.$formatters.unshift(function(a) {
					return $filter(attrs.format)(ctrl.$modelValue)
				});

				ctrl.$parsers.unshift(function(viewValue) {
					var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
					elem.val($filter(attrs.format)(plainNumber));
					return plainNumber;
				});
			}
		};
	}]);

	labs.directive("phyRut", function() {
		return {
			restrict : 'E',
			scope : {
				rut : "="
			},
			link : function(scope, element, attributes) {
				scope.$watch('rut', function(value) {

					if(value != null)
					{
						var rut = value;
						var rutdv = rut.slice(-1);
						var rutnodv = rut.slice(0, -1)
	
						var rutTexto = rutdv + "-";
						var s = "";
						var temp = rutnodv.toString();
						for (var i = temp.length - 1,
						    j = 0; i >= 0; i--, j++) {
							if (j % 3 == 0 && j != 0)
								s = s + ".";
							s = s + "" + temp[i];
						}
						s = rutTexto + s;
						for (var i = s.length - 1,
						    o = ''; i >= 0; o += s[i--]) {
						}
						element[0].textContent = o;
					}
				});
			},
		};
	});
})();

