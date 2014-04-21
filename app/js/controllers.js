'use strict';

/* Controllers */

var cashBalanceControllers = angular.module('cashBalanceControllers', []);

cashBalanceControllers.controller('BalanceListCtrl', ['$scope', 'BalanceLine',
    function ($scope, BalanceLine) {
        $scope.lines = [];
        $scope.linesByCategory = [];

        BalanceLine.getAll().success(function(data){
//            debugger;
            $scope.lines = data.map(function(l){
                return {
                    Date: new Date(l.Date),
                    Sum: l.Sum,
                    IsIncome: Boolean(+l.IsIncome),
                    Category: {
                        Id: l.CategoryId,
                        Name: l.CategoryName,
                        IsIncome: Boolean(+l.IsIncome)
                    }
                };
            });
            console.log('lines:', $scope.lines);
        });

        $scope.$watch('lines', function(field, oldVal, newVal){
            var result = [];
            var byCategories = {};
            if($scope.lines){
                $scope.lines.forEach(function(l){
                    if(!byCategories[l.Category.Id]){
                        byCategories[l.Category.Id] = {
                            Sum: 0,
                            Category: l.Category
                        };
                        result.push(byCategories[l.Category.Id]);
                    }
                    byCategories[l.Category.Id].Sum += l.Sum;
                });
            }
            $scope.linesByCategory = result;
        });

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

cashBalanceControllers.controller('AddCtrl', ['$scope', '$routeParams', '$location', 'Category', 'BalanceLine',
    function ($scope, $routeParams, $location, Category, BalanceLine) {
        $scope.type = $routeParams['type'] || 'expense';
        $scope.model = {
            Category: null,
            Sum:0,
            Date: new Date(),
            Note:null
        };
        $scope.categoryListAll = [];
        $scope.categoryList = [];
        $scope.category = null;
        Category.getAll().success(function(data){
            $scope.categoryListAll = data.map(function(c){
                return {
                    Id: c.ID,
                    Name: c.CategoryName,
                    IsIncome: Boolean(c.IsIncome)
                }
            });
            $scope.categoryList = $scope.categoryListAll.filter(function(c){
                return c.IsIncome === ($scope.type === 'income');
            });
            $scope.model.Category = $scope.categoryList[0] || null;
        });

        $scope.add = function(){
            BalanceLine.save($scope.model);//.success(function(){
                $location.url('/');
//            });
        };
}]);


cashBalanceControllers.controller('CategoryCtrl', [
    '$scope',
    '$routeParams',
    'BalanceLine',
    function($scope, $routeParams, BalanceLine){
        var categoryId = $routeParams['category'];
        $scope.lines = [];
        $scope.categoryName = '';
        BalanceLine.getAllByCategory(categoryId).success(function(data){
            //            debugger;
            $scope.lines = data.map(function(l){
                return {
                    Date: new Date(l.Date),
                    Sum: l.Sum,
                    IsIncome: Boolean(+l.IsIncome),
                    Note: l.Note,
                    Category: {
                        Id: l.CategoryId,
                        Name: l.CategoryName,
                        IsIncome: Boolean(+l.IsIncome)
                    }
                };
            });
            var first = $scope.lines[0];
            if(first && first.Category){
                $scope.categoryName = first.Category.Name;
            }
            console.log('lines:', $scope.lines);
        });
    }
]);