'use strict';

/* Services */

var cashBalanceServices = angular.module('cashBalanceServices', []);

cashBalanceServices.factory('BalanceLine', function ($http) {
    var factory = {};

    factory.getAll = function(){
        return $http.get('/api/balanceline');
    }.bind(factory);

    return factory;
});