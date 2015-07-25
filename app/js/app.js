var app = angular.module('app.angular-wizard', ['ngRoute', 'wizard']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main.html',
                controller: 'mainController'
            });
    }]);

app.controller('mainController', ['$scope', function($scope) {

  angular.extend($scope, {
    uiState: {
      name: 'Craig'
    }
  });


}]);