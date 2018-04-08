(function() {
    'use strict';

    angular.module("UserService", [])
        .service("UserService", UserService);

    function UserService($http) {
        const urlBase = 'http://localhost:8080/usuarios/';
        const methods = {
            GET: 'GET',
            POST: 'POST',
            PATCH: 'PATCH',
            DELETE: 'DELETE'
        }

        this.login = function(login, senha) {
            let path = "login/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data: $.param({ 'login': login, 'senha': senha }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            return $http(request);
        }

        this.create = function(user) {
            let request = {
                url: urlBase,
                method: methods.POST,
                data: user,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.update = function(user) {
            let request = {
                url: urlBase,
                method: methods.PATCH,
                data: user,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.delete = function delete(email) {
        	let path = email;

        	let request = {
        		url : urlBase + path,
        		method : methods.DELETE,
        		headers: { 'Authorization': 'Bearer ' + localStorage.token }
        	}

        	return $http(request); 
        }

        this.readAll = function() {
            let request = {
                url: urlBase,
                method: methods.GET,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.readSingle = function(email) {
            let path = "usuario/" + email;

            let request = {
                url: urlBase + path,
                method: methods.GET,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }
    }

    UserService.$inject = ['$http']
})();