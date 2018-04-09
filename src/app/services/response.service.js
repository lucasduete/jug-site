(function() {
    'use strict';

    angular.module("ResponseService", [])
        .service("ResponseService", ResponseService);

    function ResponseService($http) {
        const urlBase = 'http://localhost:8080/api/responses/';
        const methods = {
            GET: 'GET',
            POST: 'POST',
            PATCH: 'PATCH',
            DELETE: 'DELETE'
        }

        this.create = function(response) {
            let request = {
                url: urlBase,
                method: methods.POST,
                data: response,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.update = function(response) {
            let request = {
                url: urlBase,
                method: methods.PATCH,
                data: response,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.delete = function(response) {
            let request = {
                url : urlBase + path,
                method : methods.DELETE,
                data : response,
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

        this.readSingle = function(id) {
            let path = "response/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data : id,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.readByPubl = function(publication) {
            let path = "publication/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data : publication,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }
    }

    ResponseService.$inject = ['$http']
})();