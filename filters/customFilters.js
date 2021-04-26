angular.module("customFilters",[])
.filter("unique",function(){
    return function(data, propertyName){
        if(angular.isArray(data) && angular.isString(propertyName)){
            var results = [];
            var keys = {};
            for(var i = 0; i < data.length; i++){
                var val = data[i][propertyName];
                if(angular.isUndefined(keys[val])){
                    keys[val] = true;
                    results.push(val);
                }
            }
            return results;
        }else{
            return data;
        }
    }
})
.filter("range", function($filter){
    return function(data, page, size){
        if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
            var start_index = (page - 1) * size;
            if(data.length < start_index){
                return[];
            }else{
                return $filter("limitTo")(data.splice(start_index), size);
            }
        }else{
            return data;
        }
    }
})
.filter("pageCount", function(){
    return function (data, size){
        if(angular.isArray(data)){
            var result = [];
            for(var i = 0; i< Math.ceil(data.length / size); i++){
                result.push(i);
            }
            return result;
        }else{
            return data;
        }
    }
});

/* 
filter 메서드의 인자는 필터명(이 경우 고유한 이름)과 실제 작업을 수행할 필터 함수를 반환하는 팩터리 함수를 인자로 받는다.
AngularJS에서는 필터 인스턴스를 생성해야 할 때 '팩터리 함수'를 호출하고, 필터링을 수행할 때는 '필터 함수'를 호출한다.

모든 필터 함수는 포매팅할 데이터를 인자로 받는데, 
여기서 사용한 커스텀 필터에서는 고유 값 목록을 생성하는 데 사용할 객체 속성을 지정하기 위해
propertyName이라는 인자를 추가로 정의하고 있다. 

데이터 배열의 내용을 모두 순회하며 propertyName 인자를 통해 제공되는 속성명의 고유 값 목록을 구성하기만 하면 된다.

필터 함수는 수신한 데이터를 처리할 수 없는 경우에도 필터링된 데이터를 반환해야 할 책임이 있다.
이를 위해 여기서는 처리 중인 데이터가 배열이고 propertyName이 문자열인지 검사하고
이 angular.isArray 및 angular.isString 메서드를 사용해 검사를 수행한다.
이후 코드에서는 isUndefined 메서드를 사용해 속성이 정의되어 있는지 확인한다. 


##################################################################################

페이지 기능 추가를 위한 필터 추가

1. range 필터 
- 상품 페이지에 해당하는 배열 내 일부 영역 항목을 반환한다.
- 현재 선택된 페이지(영역의 시작 인덱스를 판단하는 데 사용) 및 페이지 크기(종료 인덱스를 판단하는 데 사용)를 인자로 받는다.

- limitTo 라는 내장 필터의 기능을 기반으로 개발했다는 점을 제외하면 별다른 내용이 없다.

limitTo 내장 필터는 배열에서 지정한 개수만큼 항목을 반환해주는 필터이다.
limitTo 필터를 사용하기 위해.. 여기서는 필터 인스턴스를 생성하고 사용할 수 있게끔 $filter 서비스에 대한 의존성을 선언했다.


#
return $filter("limitTo")(data.splice(start_index), size);
이 코드는
표준 자바스크립트 splice 메서드를 사용해 데이터 배열의 일부를 선택하고 
이를 limitTo 필터의 인자로 전달해 페이지에서 표시할 수 있는 항목 개수 이상을 선택하지 못하게 제한했다.
limitTo 필터는 배열의 길이를 넘어서는 문제를 알아서 해결해주고, 지정한 숫자를 사용할 수 없는 경우 더 적은 항목을 반환해준다.

2. pageCount 필터
조금 조잡한(하지만 편리한) 편법을 이용
ng-repeat 디렉티브를 사용하면 콘텐츠를 쉽게 생성할 수 있지만
이 디렉티브는 데이터 배열에만 사용할 수 있다. 
예를 들어 이 디렉티브를 사용해 지정된 횟수만큼 반복하게 할 수는 없다.
이 필터에서는 데이터 배열을 모두 보여주는 데 필요한 페이지 개수를 계산하고, 페이지 수만큼의 숫자 값이 들어 있는 배열을 생성한다.
따라서, 예를 들어 데이터 배열을 세 페이지에서 보여줄 수 있다면
pageCount 필터의 결과는 1, 2, 3 값을 담고 있는 배열이 된다.

##################################################################################




*/