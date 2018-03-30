angular.module("app").directive("bfFieldError", function bfFieldError($compile) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModelCtrl) {
            var subScope = scope.$new(true);

            subScope.hasError = function() {
                return ngModelCtrl.$dirty && ngModelCtrl.$invalid;
            };

            subScope.errors = function() {
                return ngModelCtrl.$error;
            };

            var hint = $compile('<ul class="bf-field-error" ng-if="hasError()"><li ng-repeat="(name,wrong) in errors()" ng-if="wrong">{{name | error}}</li></ul>')(
                subScope
            );
            element.after(hint);
        }
    };
});
