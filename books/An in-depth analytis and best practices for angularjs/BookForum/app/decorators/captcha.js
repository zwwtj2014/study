angular.module("app").directive("bfCaptcha", function bfCaptcha() {
    return {
        restrict: "A",
        link: function(scope, element) {
            var changSrc = function() {
                element.attr("src", "/api/captcha.jpg?random=" + new Date().getTime());
            };

            // 初始化
            changSrc();

            element.on("click", function() {
                changSrc();
            });
        }
    };
});
