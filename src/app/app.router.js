(function() {
    'use strict'

    angular.module('JugSite')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '../views/login.html',
                controller: 'LoginController',
                controllerAs: 'Login'
            })
            .when('/cadastrar', {
                templateUrl: '../views/cadastrarUsuario.html',
                controller: 'UserController',
                controllerAs: 'User'
            })
            .otherwise({
                redirectTo: '/login'
            })
    }
    config.$inject = ['$routeProvider']
})();