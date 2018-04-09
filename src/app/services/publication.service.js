(function() {
    'use strict';

    angular.module("PublicationService", [])
        .service("PublicationService", PublicationService);

    function PublicationService($http) {
        const urlBase = 'http://localhost:8080/api/publications/';
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
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }

        this.update = function(publication) {
            let request = {
                url: urlBase,
                method: methods.PATCH,
                data: publication,
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }

        this.delete = function(publication) {
        	let request = {
        		url : urlBase + path,
        		method : methods.DELETE,
                data : publication,
        		headers: { 'Authorization': localStorage.token }
        	}

        	return $http(request); 
        }

        this.readAll = function() {
            let request = {
                url: urlBase,
                method: methods.GET,
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }

        this.readSingle = function(id) {
            let path = "publication/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data : id,
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }

        this.readByTec = function(tecnology) {
            let path = "tecnology/";

            let request = {
                url: urlBase + path,
                method: methods.POST,
                data : tecnology,
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }
    }

    PublicationService.$inject = ['$http']
})();