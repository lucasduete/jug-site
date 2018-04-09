(function() {

    'use strict';

    angular.module('UserController', ['UserService'])
        .controller('UserController', ['UserService', UserController]);

    function UserController(UserService) {
        let vm = this;

        vm.perfil = angular.fromJson(localStorage.user);

        vm.create = function(user) {
            let newUser = {};

            if (user) {
                newUser = {
                    'nome': user.nome,
                    'username' : user.username,
                    'email': user.email,
                    'login': user.login,
                    'senha': user.senha,
                };
            }

            UserService.create(newUser)
                .then(function(success) {
                    swal({
                        type: 'success',
                        title: 'Cadastro realizado!',
                        text: 'O usuário ' + novoAdm.nome + ' foi cadastrado com sucesso!',
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

        vm.update = function(dados) {
            let perfil = new Object();
            perfil.nome = dados.nome || vm.perfil.nome;
            perfil.username = dados.username || vm.perfil.username;
            perfil.email = vm.perfil.email;
            perfil.login = dados.login || vm.perfil.login;
            perfil.senha = dados.novaSenha || dados.senhaAtual;

            validateUser(dados.senhaAtual, function(result) {
                console.log('Usuario Validado : ', result);
                UserService.update(perfil)
                    .then(function(success) {

                        let usuarioLogado = {
                            nome: perfil.nome,
                            username : perfil.username,
                            email: perfil.email
                        };

                        
                        localStorage.setItem('user', angular.toJson(usuarioLogado));
                        readSingle();

                        swal({
                            type: 'success',
                            title: 'Dados alterados!'
                        });
                    })
                    .catch(function(error) {
                        swal({
                            type: 'error',
                            title: 'Os dados não foram modificados!',
                            text: 'Informe todos os dados corretamente.',
                        });
                        console.log('Erro Perfil não atualizado : ', error);
                    })
            });
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
                    UserService.delete()
                    .then(function(sucess) {
                        $rootScope.user = false;
                        localStorage.clear();

                        console.log("Removido com sucesso!")
                         swal({
                                title: 'Conta excluída!',
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
                            text: 'Não foi possivel Remover sua conta, tente novamente mais tarde.',
                        });
                        console.log('Erro remover conta : ', error);
                    })
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    swal(
                        'Cancelado',
                        'A conta não foi excluida',
                        'error'
                    )
                } 
            });
        }

        let readSingle = function() {
            UserService.readSingle()
                .then(function(success) {
                    console.log('Sucess readSingle : ', success.data);
                    localStorage.setItem('user', angular.toJson(success.data));
                    location.reload();
                })
                .catch(function(error) {
                    console.log("Erro requisição de perfil : ", error);
                })
        };

        let validateUser = function(senha, callback) {
            UserService.login(vm.perfil.login, senha)
                .then(function(success) {
                    callback(success.data);
                })
                .catch(function(error) {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Informe sua senha atual corretamente.',
                    });
                    console.log('Error Validacao de Usuario : ', error);
                })
        }
    }
})();