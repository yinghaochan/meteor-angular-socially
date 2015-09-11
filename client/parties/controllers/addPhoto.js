angular.module("socially").controller("AddPhotoCtrl", function ($scope, $meteor, $rootScope, $state, $mdDialog) {
  $scope.addImages = function (files) {
    if (files.length > 0) {
      $scope.images.save(files[0]);
    }
  };

  $scope.close = $mdDialog.hide;
});