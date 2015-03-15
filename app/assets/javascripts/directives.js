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

	labs.constant('dropdownConfig', {
		openClass : 'open'
	}).service('dropdownService', ['$document',
	function($document) {
		var openScope = null;

		this.open = function(dropdownScope) {
			if (!openScope) {
				$document.bind('click', closeDropdown);
				$document.bind('keydown', escapeKeyBind);
			}

			if (openScope && openScope !== dropdownScope) {
				openScope.isOpen = false;
			}

			openScope = dropdownScope;
		};

		this.close = function(dropdownScope) {
			if (openScope === dropdownScope) {
				openScope = null;
				$document.unbind('click', closeDropdown);
				$document.unbind('keydown', escapeKeyBind);
			}
		};

		var closeDropdown = function(evt) {
			// This method may still be called during the same mouse event that
			// unbound this event handler. So check openScope before proceeding.
			if (!openScope) {
				return;
			}

			var toggleElement = openScope.getToggleElement();
			if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
				return;
			}

			openScope.$apply(function() {
				openScope.isOpen = false;
			});
		};

		var escapeKeyBind = function(evt) {
			if (evt.which === 27) {
				openScope.focusToggleElement();
				closeDropdown();
			}
		};
	}]).controller('DropdownController', ['$scope', '$attrs', '$parse', 'dropdownConfig', 'dropdownService', '$animate',
	function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
		var self = this,
		    scope = $scope.$new(), // create a child scope so we are not polluting original one
		    openClass = dropdownConfig.openClass,
		    getIsOpen,
		    setIsOpen = angular.noop,
		    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

		this.init = function(element) {
			self.$element = element;

			if ($attrs.isOpen) {
				getIsOpen = $parse($attrs.isOpen);
				setIsOpen = getIsOpen.assign;

				$scope.$watch(getIsOpen, function(value) {
					scope.isOpen = !!value;
				});
			}
		};

		this.toggle = function(open) {
			return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
		};

		// Allow other directives to watch status
		this.isOpen = function() {
			return scope.isOpen;
		};

		scope.getToggleElement = function() {
			return self.toggleElement;
		};

		scope.focusToggleElement = function() {
			if (self.toggleElement) {
				self.toggleElement[0].focus();
			}
		};

		scope.$watch('isOpen', function(isOpen, wasOpen) {
			$animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

			if (isOpen) {
				scope.focusToggleElement();
				dropdownService.open(scope);
			}
			else {
				dropdownService.close(scope);
			}

			setIsOpen($scope, isOpen);
			if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
				toggleInvoker($scope, {
					open : !!isOpen
				});
			}
		});

		$scope.$on('$locationChangeSuccess', function() {
			scope.isOpen = false;
		});

		$scope.$on('$destroy', function() {
			scope.$destroy();
		});
	}]).directive('dropdown', function() {
		return {
			controller : 'DropdownController',
			link : function(scope, element, attrs, dropdownCtrl) {
				dropdownCtrl.init(element);
			}
		};
	}).directive('dropdownToggle', function() {
		return {
			require : '?^dropdown',
			link : function(scope, element, attrs, dropdownCtrl) {
				if (!dropdownCtrl) {
					return;
				}

				dropdownCtrl.toggleElement = element;

				var toggleDropdown = function(event) {
					event.preventDefault();

					if (!element.hasClass('disabled') && !attrs.disabled) {
						scope.$apply(function() {
							dropdownCtrl.toggle();
						});
					}
				};

				element.bind('click', toggleDropdown);

				// WAI-ARIA
				element.attr({
					'aria-haspopup' : true,
					'aria-expanded' : false
				});
				scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
					element.attr('aria-expanded', !!isOpen);
				});

				scope.$on('$destroy', function() {
					element.unbind('click', toggleDropdown);
				});
			}
		};
	});

})();

