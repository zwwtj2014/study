angular.module("app").filter("page", function() {
    return function(input, page, pageSize) {
        if (!input) {
            return input;
        }
        if (page < 0 || pageSize <= 0) {
            return [];
        }
        return input.slice(page * pageSize, (page + 1) * pageSize);
    };
});
