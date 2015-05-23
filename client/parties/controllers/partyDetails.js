angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.party = $scope.$meteorObject(Parties, $stateParams.partyId).subscribe('parties');

    $scope.users = $scope.$meteorCollection(Meteor.users, false).subscribe('users');

    $scope.invite = function(user){
      $meteor.call('invite', $scope.party._id, user._id).then(
        function(data){
          console.log('success inviting', data);
        },
        function(err){
          console.log('failed', err);
        }
      );
    };
    
    $scope.canInvite = function (){
        if (!$scope.party)
          return false;
  
        return !$scope.party.public &&
          $scope.party.owner === Meteor.userId();
    };

    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8,
      events: {
        click: function (mapModel, eventName, originalEventArgs) {
          if (!$scope.party)
            return;

          if (!$scope.party.location)
            $scope.party.location = {};

          $scope.party.location.latitude = originalEventArgs[0].latLng.lat();
          $scope.party.location.longitude = originalEventArgs[0].latLng.lng();
          //scope apply required because this event handler is outside of the angular domain
          $scope.$apply();
        }
      },
      marker: {
        options: { draggable: true },
        events: {
          dragend: function (marker, eventName, args) {
            if (!$scope.party.location)
              $scope.party.location = {};

            $scope.party.location.latitude = marker.getPosition().lat();
            $scope.party.location.longitude = marker.getPosition().lng();
          }
        }
      }
    };

  }]);


Meteor.publish("parties", function (options) {
  return Parties.find({
    $or:[
      {$and:[
        {"public": true},
        {"public": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]}, options);
});