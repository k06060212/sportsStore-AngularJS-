angular.module("sportsStore")
.controller("sportsStoreCtrl", function($scope){

    $scope.data = {
        products: [
            { name : "Product #1", description: "A product", category: "Category #1", price: 1010},
            { name : "Product #2", description: "A product", category: "Category #1", price: 100},
            { name : "Product #3", description: "A product", category: "Category #2", price: 4100},
            { name : "Product #4", description: "A product", category: "Category #3", price: 52100}
        ]
    };
});