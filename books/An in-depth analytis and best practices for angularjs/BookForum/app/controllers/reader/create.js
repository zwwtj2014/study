angular.module("app").controller("ReaderCreateCtrl", function ReaderCreateCtrl(Reader) {
    var vm = this;
    vm.submit = function(form) {
        Reader.save(
            form,
            function(reader) {
                console.log("save success");
            },
            function(res) {
                console.log("save fail");
            }
        );
    };
});
