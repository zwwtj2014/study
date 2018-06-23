var app = new Vue({
    el: '#app',
    data: function () {
        return {
            show: false
        }
    },
    methods: {
        handleClose() {
            this.show = false;
        }
    }
});