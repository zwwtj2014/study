var app = new Vue({
    el: '#app',
    data: {
        allChecked: false,
        list: [{
            id: 1,
            checked: false,
            name: 'iPhone 7',
            price: 6188,
            count: 1
        }, {
            id: 2,
            checked: false,
            name: 'iPad Pro',
            price: 5888,
            count: 1
        }, {
            id: 3,
            checked: false,
            name: 'MacBook Pro',
            price: 21488,
            count: 1
        }]
    },
    computed: {
        totalPrice: function () {
            let sum = 0;
            for (const item of this.list) {
                if (item.checked) {
                    sum += item.price * item.count;
                }
            }
            return `${sum}`.replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        checkAll() {
            this.allChecked = !this.allChecked;
            for (const item of this.list) {
                item.checked = this.allChecked;
            }
        },
        checkItem(index) {
            this.list[index].checked = !this.list[index].checked;
        },
        handleReduce(index) {
            const item = this.list[index];

            if (item.count === 1) {
                return;
            }
            item.count--;
        },
        handleAdd(index) {
            this.list[index].count++;
        },
        handleRemove(index) {
            this.list.splice(index, 1);
        }
    }
});