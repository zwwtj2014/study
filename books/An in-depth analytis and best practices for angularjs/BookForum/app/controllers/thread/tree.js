angular.module("app").controller("ThreadTreeCtrl", function ThreadTreeCtrl() {
    var vm = this;

    vm.items = [
        {
            id: 1,
            title: "这是第一个主题",
            poster: "clam",
            dateCreated: "2015-02-19T00:00:00",
            items: [
                {
                    id: 11,
                    title: "这是第一个回复",
                    poster: "clam",
                    dateCreated: "2015-02-19T00:00:01",
                    items: [
                        {
                            id: 111,
                            title: "回复1.1",
                            poster: "clam",
                            dateCreated: "2015-02-19T00:01:00"
                        },
                        {
                            id: 112,
                            title: "回复1.2",
                            poster: "clam",
                            dateCreated: "2015-02-19T00:01:30"
                        }
                    ]
                },
                {
                    id: 12,
                    title: "这是第二个回复",
                    poster: "clam",
                    dateCreated: "2015-02-19T00:00:03"
                }
            ]
        },
        {
            id: 2,
            title: "这是第二个主题，含有字母abcd和数字1234",
            poster: "clam",
            dateCreated: "2015-02-19T15:00:00"
        }
    ];
});
