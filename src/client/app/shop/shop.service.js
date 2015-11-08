(function() {
    'use strict';

    angular
        .module('app.shop')
        .service('shopService', shopService);

    shopService.$inject = ['playerService', 'inventoryService'];

    /* @ngInject */
    function shopService(playerService, inventoryService) {
    	var vm = this;
    	vm.initShop = function() {
    		createShopList();
    	}

        vm.buyItem = function(item) {

        }

        vm.shopList = [];

        ////////////////
        function test(item) {
        }
        function createShopList() {
        	for (var i = 0; i < inventoryService.masterItemList.length; i++) {
        		var key = inventoryService.masterItemList[i];
        		var thisItem = inventoryService.itemDictionary[key][0][1];
        		if (thisItem.buyable) {
        			vm.shopList.push(thisItem);
        		}
        	}
        	console.log(vm.shopList)

 		}


        function checkBalance(item) {
        	if (item.price > playerService.money) {
        		console.log('not enough money');
        	} else {
        		subtractCost(item);
        		addToInventory(item);
        		checkQuantity(item);
        	}
        }

        function subtractCost(item) {
        	playerService.money = playerService.money - item.price;
        }

        function addItem(item) {

        }

		function removeItem(item) {

        }

        function displayNextItem(item) {

        }

        function checkQuantity(item) {

        }

        function increasePrice(item) {

        }

        function addToInventory(item) {

        }

    }
})();