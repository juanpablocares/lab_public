/**
    Procedencias de manera persistente.
*/

(function() {
    var labs = angular.module('lab');

    labs.service('procedenciasService', function () {
        var procedencias = null;

        return {
            getProcedencias: function () {
                return procedencias;
            },
            setProcedencias: function(value) {
                procedencias = value;
            }
        };
    });
    
})();
