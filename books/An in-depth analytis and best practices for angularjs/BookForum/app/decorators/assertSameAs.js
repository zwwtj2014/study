angular.module("app").directive("bfAssertSameAs", function bfAssertSameAs() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModelCtrl) {
            var isSame = function(value) {
                var anotherValue = scope.$eval(attrs.bfAssertSameAs);
                return value === anotherValue;
            };

            ngModelCtrl.$parsers.push(function(value) {
                var s = isSame(value);
                ngModelCtrl.$setValidity("same", s); // $setValidity 和 $error 相反
                return s ? value : undefined;
            });

            scope.$watch(
                function() {
                    return scope.$eval(attrs.bfAssertSameAs);
                },
                function() {
                    ngModelCtrl.$setValidity("same", isSame(ngModelCtrl.$modelValue));
                }
            );
        }
    };
});
