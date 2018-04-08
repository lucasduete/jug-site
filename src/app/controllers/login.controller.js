(function() {
    'use strict';

    angular.module('LoginController', ['UserService'])
        .controller('LoginController', ['UserService', '$location', '$rootScope', LoginController]);

    function LoginController(UserService, $location, $rootScope, $scope) {
        let vm = this;

        vm.login = function(dadosLogin) {
        	if (verificaDados(dadosLogin)) {
	            let usuario = dadosLogin.usuario;
	            let senha = dadosLogin.senha;

	            UserService.login(usuario, senha)
	                .then(function(success) {
	                    //Salvando token no localStorage
	                    let token = success.data.senha;
	                    localStorage.setItem("token", token);

	                    //Salvando nome, email e tipo de usuário no localStorage
	                    let usuarioLogado = {
	                        nome: success.data.nome,
	                        username: sucess.data.username,
	                        email: success.data.email,
	                    };

	                    localStorage.setItem('user', angular.toJson(usuarioLogado));

	                    $location.path('/enquetes');
	                })
	                .catch(function(error) {
	                    swal({
	                        type: 'error',
	                        title: 'Oops...',
	                        text: 'Verifique se os dados informados estão corretos e tente novamente.',
	                    });
	                    console.log("Não foi possível realizar o login.", error);
	                })
		        
            }
        };

        vm.sair = function() {
            $rootScope.user = false;
            localStorage.clear();
        };
        
        let verificaDados = (dadosLogin, usuario) => {
            if (dadosLogin === undefined || dadosLogin.usuario === undefined || dadosLogin.senha === undefined || usuario === undefined || usuario === null) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Informe todos os dados corretamente.',
                });
                return false;
            } else {
                return true;
            }
        };
    }
})();