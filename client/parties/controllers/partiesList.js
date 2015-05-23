angular.module("socially").controller("PartiesListCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = { name: 1 };
    $scope.orderProperty = '1';

    var xx = [
      {name:"yooy", description:'asdfasdf'},
      {name:"yooy1", description:'asdfasdf'},
      {name:"yooy2", description:'asdfasdf'},
      {name:"yooy3", description:'asdfasdf'}
    ];

    $scope.users = $scope.$meteorCollection(Meteor.users, false).subscribe('users');
    
    $scope.parties = $scope.$meteorCollection(function() {
      return Parties.find({}, {
        sort : $scope.getReactively('sort')
      });
    });

    $meteor.autorun($scope, function() {
      $scope.$meteorSubscribe('parties', {
        limit: parseInt($scope.getReactively('perPage')),
        skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('search')).then(function() {
        $scope.partiesCount = $scope.$meteorObject(Counts ,'numberOfParties', false);

        $scope.parties.forEach( function (party) {
          party.onClicked = function () {
            $state.go('partyDetails', {partyId: party._id});
          };
        });

        $scope.map = {
          center: {
            latitude: 45,
            longitude: -73
          },
          zoom: 8
        };

        if (!$scope.parties[1].books)
          $scope.parties[1].books = xx;
      });
    });

    $scope.remove = function(party){
      $scope.parties.splice( $scope.parties.indexOf(party), 1 );
    };

    $scope.pageChanged = function(newPage) {
      $scope.page = newPage;
    };

    $scope.$watch('orderProperty', function(){
      if ($scope.orderProperty)
        $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };

    $scope.creator = function(party){
      if (!party)
        return;
      var owner = $scope.getUserById(party.owner);
      if (!owner)
        return "nobody";

      if ($rootScope.currentUser)
        if ($rootScope.currentUser._id)
          if (owner._id === $rootScope.currentUser._id)
            return "me";

      return owner;
    };

    $scope.rsvp = function(partyId, rsvp){
      $meteor.call('rsvp', partyId, rsvp).then(
        function(data){
          console.log('success responding', data);
        },
        function(err){
          console.log('failed', err);
        }
      );
    };
}]);