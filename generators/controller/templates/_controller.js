'use restrict';

class <%= controllerName %>Controller {
    constructor(){
        var vm = this;
    }
}

export default angular
    .module('<%= moduleName %>.controller', [])
    .controller('<%= controllerName %>Controller', <%= controllerName %>Controller);
