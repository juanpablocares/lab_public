angular.module('lab').filter('getByParam', [function($filter) {
  return function(array, param, value, ignore_case) {
    var i=0, len = array.length;
    for (; i < len; i++) {
      if (ignore_case == true && angular.lowercase(array[i][param]) == angular.lowercase(value)) {
        return array[i];
      }
    }
    return null;
  }
}]);