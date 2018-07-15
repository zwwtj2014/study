var app = new Vue({
    el: '#app',
    data: {
        columns: [{
                title: '姓名',
                key: 'name'
            }, {
                title: '年龄',
                key: 'age',
                sortable: true
            },
            {
                title: '出生日期',
                key: 'birthday',
                sortable: true
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data: [{
            name: '王小明1',
            age: 18,
            birthday: '1999-02-21',
            address: '南京市雨花台区'
        }, {
            name: '王小明2',
            age: 19,
            birthday: '1999-02-21',
            address: '南京市雨花台区'
        }, {
            name: '王小明3',
            age: 20,
            birthday: '1999-02-21',
            address: '南京市雨花台区'
        }, {
            name: '王小明4',
            age: 21,
            birthday: '1999-02-21',
            address: '南京市雨花台区'
        }]
    },
    methods: {
        handleAddData() {
            this.data.push({
                name: '王小明5',
                age: 18,
                birthday: '1999-02-21',
                address: '南京市雨花台区'
            });
        }
    }
});