'use strict';

/* Services */

var cashBalanceServices = angular.module('cashBalanceServices', []);

cashBalanceServices.factory('BalanceLine', function () {
    var factory = {};

    factory.getAll = function(){
        return [];
    }.bind(factory);

    return factory;
});