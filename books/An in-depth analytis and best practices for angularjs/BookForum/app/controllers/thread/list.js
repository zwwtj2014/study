angular.module("app").controller("ThreadListCtrl", function() {
    var vm = this;
    vm.items = [
        {
            title: "这是第一个主贴",
            poster: "clam",
            dateCreated: "2018-03-31T00:00:00"
        },
        {
            title: "这是第二个主贴",
            poster: "elsa",
            dateCreated: "2018-03-31T00:00:00"
        }
    ];

    for (var i = 0; i < 10; i++) {
        vm.items.push({
            title: "这是第" + (i + 2) + "个主贴",
            poster: "clam",
            dateCreated: "2018-03-31T00:00:00"
        });
    }

    vm.page = {
        index: 0,
        size: 5
    };
});
