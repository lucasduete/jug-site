(function() {
    'use strict';

    angular.module("TecnologyService", [])
        .service("TecnologyService", TecnologyService);

    function TecnologyService($http) {
        const urlBase = 'http://localhost:8080/api/tecnologias/';
        const methods = {
            GET: 'GET',
            POST: 'POST',
            PATCH: 'PATCH',
            DELETE: 'DELETE'
        }

        this.create = function(tecnology) {
            let request = {
                url: urlBase,
                method: methods.POST,
                data: tecnology,
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }

        this.update = function(tecnology) {
            let request = {
                url: urlBase,
                method: methods.PATCH,
                data: tecnology,
                headers: { 'Authorization': localStorage.token }
            }

            return $http(request);
        }

        this.delete = function(tecnology) {
        	let request = {
        		url : urlBase + path,
        		method : methods.DELETE,
                data : tecnology,
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
    }

    TecnologyService.$inject = ['$http']
})();