/**
    Perfiles de manera persistente.
*/

(function() {
    var labs = angular.module('lab');

    labs.service('perfilesService', function () {
        var perfiles = null;

        return {
            getPerfiles: function () {
                return perfiles;
            },
            setPerfiles: function(value) {
                perfiles= value;
            }
        };
    });
    
})();
