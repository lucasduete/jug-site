(function() {
    'use strict';

    angular.module("PublicationService", [])
        .service("PublicationService", PublicationService);

    function PublicationService($http) {
        const urlBase = 'http://localhost:8080/publications/';
        const methods = {
            GET: 'GET',
            POST: 'POST',
            PATCH: 'PATCH',
            DELETE: 'DELETE'
        }

        this.create = function(publication) {
            let request = {
                url: urlBase,
                method: methods.POST,
                data: publication,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.update = function(publication) {
            let request = {
                url: urlBase,
                method: methods.PATCH,
                data: publication,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.delete = function delete(publication) {
        	let request = {
        		url : urlBase + path,
        		method : methods.DELETE,
                data : publication,
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
            let path = "publication/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data : id,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }

        this.readByTec = function(tecnology) {
            let path = "tecnology/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data : tecnology,
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            }

            return $http(request);
        }
    }

    PublicationService.$inject = ['$http']
})();