angular.module("app").filter("error", function(Errors) {
    return function(name, customMessages) {
        var errors = angular.extend({}, Errors, customElements);
        return errors[name] || name;
    };
});
