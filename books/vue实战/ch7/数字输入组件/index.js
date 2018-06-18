var app = new Vue({
    el: '#app',
    data: {
        value: 5
    },
    methods: {
        onChange(val) {
            console.log(val);
        }
    }
});