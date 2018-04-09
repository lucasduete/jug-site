(function() {

    'use strict';

    angular.module('PublicationController', ['PublicationService'])
        .controller('PublicationController', ['PublicationService', PublicationController]);

    function PublicationController(PublicationService) {
        let vm = this;

        vm.create = function(publ) {
            let newPubl = {};

            if (publ) {
                newPubl = {
                    'titulo': publ.titulo,
                    'conteudo' : publ.conteudo,
                    'data': "2000-02-01",
                    'tecnologia': publ.tecnologia
                };
            }

            PublicationService.create(publ)
                .then(function(success) {
                    swal({
                        type: 'success',
                        title: 'Publicação Cadastrada!',
                        text: 'A Publicação foi cadastrada com sucesso!',
                    });
                    location.reload();
                })
                .catch(function(error) {
                    swal({
                        type: 'error',
                        title: 'O cadastro não foi realizado!',
                        text: 'Informe todos os dados corretamente.',
                    });
                    console.log('Erro de cadastro : ', error);
                })
        };

        vm.delete = function() {
            swal({
                title: 'Tem certeza?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim!',
                cancelButtonText: 'Não'
            }).then((result) => {
                if (result.value) {
                    PublicationService.delete()
                    .then(function(sucess) {
                        $rootScope.user = false;
                        localStorage.clear();

                        console.log("Removido com sucesso!")
                         swal({
                                title: 'Publicação excluída!',
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
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    swal(
                        'Cancelado',
                        'A publicação não foi excluida',
                        'error'
                    )
                }
            });
        }

        vm.readSingle = function(idPubl) {
            PublicationService.readSingle(idPubl)
                .then(function(success) {
                    vm.publication = success.data;

                    console.log('Sucess readSingle : ', success.data);
                })
                .catch(function(error) {
                    console.log("Erro requisição de SinglePublication : ", error);
                })
        };


        vm.readAll = function() {
            PublicationService.readAll()
                .then(function(success) {
                    vm.publications = success.data;

                    console.log('Sucess readAll : ', success.data);
                })
                .catch(function(error) {
                    console.log("Erro requisição de AllPublication : ", error);
                })
        };

        vm.readByTec = function(tec) {
            PublicationService.readByTec(tec)
                .then(function(success) {
                    vm.publications = success.data;

                    console.log('Sucess readByTec : ', success.data);
                })
                .catch(function(error) {
                    console.log("Erro requisição de PublicationByTec : ", error);
                })
        };


    }
})();