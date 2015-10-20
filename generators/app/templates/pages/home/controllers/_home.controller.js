'use restrict';

class HomeController {
  constructor(){
    var vm = this;

    vm.title = '';
    vm.values = [];
  }

  create() {
    var vm = this;

    if (vm.title != '' && vm.title )
      vm.values.push(vm.title);

    vm.title = '';
  }
}

export default angular
  .module('home.controller', [])
  .controller('HomeController', HomeController);
