/**
    Examenes de manera persistente.
*/
(function() {
    var labs = angular.module('lab');
    labs.service('examenesService', function () {
        var examenes = null;
        return {
            getExamenes: function () {
                return examenes;
            },
            setExamenes: function(value) {
                examenes = value;
            }
        };
    });
})();
