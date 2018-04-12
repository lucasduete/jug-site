(function() {
    'use strict';

    angular.module('JugSite', ['LoginController', 'UserController', 'PublicationController', 'ResponseController', 'ngRoute'])
        .run(preAtivador);

    function preAtivador($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (next.authorize) {
                if (!localStorage.token) {
                    event.preventDefault();
                    $location.path('#!/login');
                }
            }
        });
    }
    preAtivador.$inject = ['$rootScope', '$location'];

})();