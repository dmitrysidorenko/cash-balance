'use strict';

/* App Module */

var cashBalanceApp = angular.module('cashBalanceApp', [
    'ngRoute',
    'cashBalanceControllers',
    'cashBalanceServices',
    'ui.bootstrap'
]);

cashBalanceApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/total.html',
            controller: 'BalanceListCtrl'
        }).
            when('/add/:type', {
                templateUrl: 'partials/add.html',
                controller: 'AddCtrl'
            }).
            when('/category/:category', {
                templateUrl: 'partials/category.html',
                controller: 'CategoryCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
