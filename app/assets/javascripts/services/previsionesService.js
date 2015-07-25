/**
    Previsiones de manera persistente.
*/

(function() {
    var labs = angular.module('lab');

    labs.service('previsionesService', function () {
        var previsiones = null;

        return {
            getPrevisiones: function () {
                return previsiones;
            },
            setPrevisiones: function(value) {
                previsiones = value;
            }
        };
    });
    
})();
