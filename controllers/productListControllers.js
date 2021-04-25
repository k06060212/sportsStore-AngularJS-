/* 2. 부트스트랩 클래스명 반환 */
angular.module("sportsStore")
.constant("productListActiveClass", "btn-primary")
.constant("productListPageCount", 3)
.controller("productListCtrl",function($scope, $filter, productListActiveClass, productListPageCount){

    var selectCategory = null;

    $scope.selectedPage = 1;
    $scope.pageSize = productListPageCount;
    
    $scope.selectCategory = function(newCategory){
        selectCategory = newCategory;
        $scope.selectedPage = 1;
    }

    $scope.selectPage = function(newPage){
        $scope.selectedPage = newPage;
    }

    $scope.categoryFilterFn = function(product){
        return selectCategory == null || product.category == selectCategory;
    }

    $scope.getCategoryClass = function(category){
        return selectCategory == category ? productListActiveClass : "";
    }

    $scope.getPageClass = function(page){
        return $scope.selectedPage == page ? productListActiveClass : "";
    }

});


/* 1)

angular.module("sportsStore")
.controller("productListCtrl",function($scope, $filter){

    var selectCategory = null;
    
    $scope.selectCategory = function(newCategory){
        selectCategory = newCategory;
    }

    $scope.categoryFilterFn = function(product){
        return selectCategory == null || product.category == selectCategory;
    }
});


*/

/* 
app.html 파일에 정의된 sportsStore 모듈을 사용해 controller 메서드를 호출한다
(angular.module 메서드의 인자를 한 개만 지정하면 기존 모듈을 찾고, 두 인자를 사용하면 새 모듈을 생성한다는 사실을 기억하자)

ng-click 디렉티브의 동작명과 일치하는 selectCategory라는 동작을 정의한다.
또, 이 컨트롤러에서는 상품 객체를 인자로 받고, 아무 카테고리도 선택돼 있지 않거나 카테고리가 선택된 경우
해당 카테고리에 상품이 속할때 true를 반환하는 categoryFilterFn도 정의한다. 


##################################################################################

선택 카테고리 강조


##################################################################################

페이징 기능 추가
페이징 기능을 구현하는데 필요한 단계는 총 3단계이다.
1. 스코프에서 페이지 상태를 추적하게끔 컨트롤러를 수정해야한다.
2. 필터를 구현해야 한다.
3. 뷰를 업데이트해야 한다.

- 페이지에서 표시하는 상품 개수는 productListPageCount라는 상수로 정의하고, 컨트롤러의 의존성으로 선언했다.

컨트롤러 내에서는 상수 값을 노출할 스코프상의 변수(뷰에서 이 상수에 접근할 수 있게) 및 현재 선택 페이지 변수를 정의했다.

- 선택 페이지를 변경할 수 있는 selectPage 동작을 정의

ng-class 디렉티브와 함께 사용 (카테고리 강조할 때 처럼) 선택 페이지를 가옺하는 getPageClass 동작도 정의 했다.





*/