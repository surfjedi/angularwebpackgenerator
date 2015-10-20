'use restrict';

class LoginController {
    constructor(){
        var vm = this;
        vm.title = "Login";
    }
}

export default angular
    .module('login.controller', [])
    .controller('LoginController', LoginController);
