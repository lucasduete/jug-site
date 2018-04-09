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
            .when('/index', {
                templateUrl: '../views/index.html',
                controller: 'PublicationController',
                controllerAs: 'Publication'
            })
            .when('/cadastrarPublicacao', {
                templateUrl: '../views/cadastrarPublicacao.html',
                controller: 'PublicationController',
                controllerAs: 'Publication' 
            })
            .otherwise({
                redirectTo: '/login'
            })
    }
    config.$inject = ['$routeProvider']
})();