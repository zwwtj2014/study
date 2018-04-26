angular
    .module("emailParser", [])
    .config([
        "$interpolateProvider",
        function($interpolateProvider) {
            $interpolateProvider.startSymbol("__");
            $interpolateProvider.endSymbol("__");
        }
    ])
    .factory("EmailParser", [
        "$interpolate",
        function($interpolate) {
            return {
                parser: function(text, context) {
                    var template = $interpolate(text);
                    return template(context);
                }
            };
        }
    ]);
