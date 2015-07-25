/**
    Regiones de manera persistente. Una sola query para toda la app. (Vamos a ver como sale)
*/

(function() {
    var labs = angular.module('lab');

    labs.service('regionesService', function ($http) {
        var regiones = null;

        return {
            getRegiones: function () {
                return regiones;
            },
            setRegiones: function(value) {
                regiones = value;
            }
        };
    });
    
})();
