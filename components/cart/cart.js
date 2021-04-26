angular.module("cart", [])
.factory("cart", function(){
    
    var cartData = [];

    return{
        addProduct : function(id, name, price){
            var addedToExistingItem = false;
            for(var i = 0; i < cartData.length; i++){
                if(cartData[i].id ==id){
                    cartData[i].count++;
                    addedToExistingItem = true;
                    break;
                }
            }
            if(!addedToExistingItem){
                cartData.push({
                    count: 1, id: id, price: price, name: name
                });
            }
        },

        removeProduct : function(id){
            for(var i = 0; i < cartData.length; i++){
                cartData.splice(i, 1);
                break;
            }
        },

        getProducts : function(){
            return cartData;
        }
    }
})
.directive("cartSummary", function(cart){
   return{
       restrict: "E",
       templateUrl: "components/cart/cartSummary.html",
       controller: function($scope){

            var cartData = cart.getProducts();

            $scope.total = function(){
                var total = 0;
                for(var i = 0; i < cartData.length; i++){
                    total += (cartData[i].price * cartData[i].count);
                }
                return total;
            }

            $scope.itemCount = function(){
                var total = 0;
                for(var i = 0; i < cartData.length; i++){
                    total += cartData[i].count;
                }
                return total;
            }
       }
   } 
});

/*

# addProduct(id, name, price) 
    - 장바구니에 지정한 상품을 추가하거나 장바구니에 해당 상품이 이미 들어있다면 상품 개수를 늘린다.

# removeProduct(id)
    - 지정한 ID를 갖고 있는 상품을 제거한다.

# getProducts()
    - 장바구니 내 객체 배열을 반환한다.

####################################################################################################

# restrict 
    - 디렉티브를 어떻게 적용할지 지정한다.
    - 여기서는 E 값을 사용해 엘리먼트에만 디렉티브를 사용하게끔 제한했다.
    - 가장 많이 사용하는 값은 EA로, 디렉티브를 엘리먼트 또는 어트리뷰트로 적용하게 한다.

# templateUrl
    - 디렉티브의 엘리먼트 안에 삽입할 내용이 들어 있는 부분 뷰의 URL을 지정한다.

# controller 
    - 부분 뷰로 데이터 및 기능을 제공할 컨트롤러를 지정한다.

*/