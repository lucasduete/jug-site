(function() {
    'use strict';

    angular.module('LoginController', ['UserService'])
        .controller('LoginController', ['UserService', '$location', '$rootScope', LoginController]);

    function LoginController(UserService, $location, $rootScope, $scope) {
        let vm = this;

        vm.login = function(dadosLogin) {
        	if (verificaDados(dadosLogin)) {
	            let email = dadosLogin.email;
	            let senha = dadosLogin.senha;

	            UserService.login(email, senha)
	                .then(function(success) {

	                    let token = success.data.Senha;
	                    localStorage.setItem("token", token);

	                    let usuarioLogado = {
	                        nome: success.data.Nome,
	                        username: success.data.Username,
	                        email: success.data.Email,
	                    };

	                    localStorage.setItem('user', angular.toJson(usuarioLogado));

	                    $location.path('/index');
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
        
        let verificaDados = (dadosLogin) => {
            if (dadosLogin === undefined || dadosLogin.email === undefined || dadosLogin.senha === undefined) {
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