angular.module('lab').directive('lowercase', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var lowercase = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var capitalized = inputValue.toLowerCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.push(lowercase);
         lowercase(scope[attrs.ngModel]);  // lowercase initial value
     }
   };
});