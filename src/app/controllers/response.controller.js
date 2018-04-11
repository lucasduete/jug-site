(function() {

    'use strict';

    angular.module('ResponseController', ['ResponseService'])
        .controller('ResponseController', ['ResponseService', '$routeParams', ResponseController]);

    function ResponseController(ResponseService, $routeParams) {
        let vm = this;

        vm.create = function(resp) {
            let newResp = {};

            if (resp) {
                newResp = {
                    'conteudo' : resp.conteudo,
                    'idPublication': $routeParams.id
                };
            }

            ResponseService.create(newResp)
                .then(function(success) {
                    swal({
                        type: 'success',
                        title: 'Resposta Enviada!',
                        text: 'A sua resposta foi enviada!',
                    });
                    location.reload();
                })
                .catch(function(error) {
                    swal({
                        type: 'error',
                        title: 'Erro ao enviar resposta!',
                        text: 'Informe todos os dados corretamente.',
                    });
                    console.log('Erro de cadastro : ', error);
                })
        };

        /*let delete = function() {
            swal({
                title: 'Tem certeza?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim!',
                cancelButtonText: 'Não'
            }).then(result) => {
                if (result.value) {
                    ResponseService.delete()
                    .then(function(sucess) {
                        $rootScope.user = false;
                        localStorage.clear();

                        console.log("Removido com sucesso!")
                         swal({
                                title: 'Resposta excluída!',
                                type: 'success',
                                confirmButtonText: 'Ok'
                            }).then(function(result) {
                                location.reload();
                            });
                    })
                    .catch(function(error) {
                        swal({
                            type: 'error',
                            title: 'Tivemos um problema!',
                            text: 'Não foi possivel Remover esta publicação, tente novamente mais tarde.',
                        });
                        console.log('Erro remover conta : ', error);
                    })
                }
            } else if (result.dismiss === swal.DismissReason.cancel) {
                    swal(
                        'Cancelado',
                        'A publicação não foi excluida',
                        'error'
                    )
            }
        };*/

        vm.readSingle = function() {
            let idResp = $routeParams.id;
            ResponseService.readSingle(idResp)
                .then(function(success) {
                    vm.response = success.data;

                    console.log('Sucess readSingle : ', success.data);
                })
                .catch(function(error) {
                    console.log("Erro requisição de SingleResponse : ", error);
                })
        };


        vm.readAll = function() {
            ResponseService.readAll()
                .then(function(success) {
                    vm.responses = success.data;

                    console.log('Sucess readAll : ', success.data);
                })
                .catch(function(error) {
                    console.log("Erro requisição de AllResponse : ", error);
                })
        };

        vm.readByPubl = function() {
            let idPubl = $routeParams.id;
            ResponseService.readByPubl(idPubl)
                .then(function(success) {
                    vm.responses = success.data;

                    console.log('Sucess readByPubl : ', success.data);
                })
                .catch(function(error) {
                    console.log("Erro requisição de ResponsesByPubl : ", error);
                })
        };


    }
})();