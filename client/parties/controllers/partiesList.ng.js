angular
  .module('socially')
  .controller('PartiesListCtrl', PartiesListCtrl);

function PartiesListCtrl($scope, $meteor) {
  var vm = this;

  vm.page = 1;
  vm.perPage = 3;
  vm.sort = { name: 1 };
  vm.orderProperty = '1';

  vm.parties = $meteor.collection(function() {
    return Parties.find({}, {
      sort : $scope.getReactively('vm.sort')
    });
  });

  $meteor.autorun($scope, function() {
    $meteor.subscribe('parties', {
      limit: parseInt($scope.getReactively('vm.perPage')),
      skip: (parseInt($scope.getReactively('vm.page')) - 1) * parseInt($scope.getReactively('vm.perPage')),
      sort: $scope.getReactively('vm.sort')
    }, $scope.getReactively('vm.search')).then(function() {
      vm.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
    });
  });

  vm.remove = function(party){
    vm.parties.splice( vm.parties.indexOf(party), 1 );
  };

  vm.pageChanged = function(newPage) {
    vm.page = newPage;
  };

  $scope.$watch('vm.orderProperty', function(){
    if (vm.orderProperty)
      vm.sort = {name: parseInt(vm.orderProperty)};

    console.log('test', $scope.getReactively('vm.sort').name);
    console.log('test2', $scope.getReactively('vm.sort'));
  });
}