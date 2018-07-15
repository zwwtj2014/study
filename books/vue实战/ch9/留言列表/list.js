Vue.component('list', {
    props: {
        list: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    render: function (h) {
        var _this = this;
        var list = [];
        this.list.forEach((msg, index) => {
            var node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [
                h('span', msg.name + ': '),
                h('div', {
                    attrs: {
                        class: 'list-msg'
                    }
                }, [
                    h('p', msg.message),
                    h('a', {
                        attrs: {
                            class: 'list-reply'
                        },
                        on: {
                            click: function () {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复'),
                    h('a', {
                        attrs: {
                            class: 'list-delete'
                        },
                        on: {
                            click: function () {
                                _this.handleDelete(index);
                            }
                        }
                    }, '删除')
                ])
            ]);
            list.push(node);
        });

        if (this.list.length) {
            return h('div', {
                attrs: {
                    class: 'list'
                }
            }, list);
        } else {
            return h('div', {
                attrs: {
                    class: 'list-nothing'
                }
            }, '留言列表为空');
        }
    },
    methods: {
        handleReply: function (index) {
            this.$emit('reply', index);
        },
        handleDelete: function (index) {
            this.$emit('delete', index);
        }
    }
});