var wizard = angular.module('wizard', []);

wizard.directive('wizard', function() {
  return {
    restrict: 'E',
    templateUrl: '../partials/wizard.html',
    link: function($scope) {

      $scope.name = 'hello33123';

    }
  };
});