'use strict';

/* Controllers */

var cashBalanceControllers = angular.module('cashBalanceControllers', []);

cashBalanceControllers.controller('BalanceListCtrl', ['$scope',
    function ($scope) {
        $scope.lines = [];

        $scope.incomeRate = {width: '80%'};
        $scope.expenseRate = {width:  '20%'};


        $scope.datepicker = $scope.$new();
        (function ($scope) {
            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.showWeeks = true;
            $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
            };

            $scope.clear = function () {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function() {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                'year-format': "'yy'",
                'starting-day': 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
            $scope.format = $scope.formats[0];
        })($scope.datepicker);
}]);

cashBalanceControllers.controller('AddCtrl', ['$scope', '$routeParams', '$location',
    function ($scope, $routeParams, Balance, $location) {
}]);
