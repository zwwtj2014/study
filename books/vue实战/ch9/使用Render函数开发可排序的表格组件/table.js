Vue.component('vTable', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map((col, index) => {
                col._sortType = 'normal'; // 添加一个字段标识当前列排序的状态, 后续使用
                col._index = index;
                return col;
            });
        },
        makeData: function () {
            this.currentData = this.data.map((row, index) => {
                row._index = index;
                return row;
            });
        },
        handleSortByAsc(index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(col => {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort((a, b) => {
                return a[key] > b[key] ? 1 : -1;
            })
        },
        handleSortByDesc(index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(col => {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort((a, b) => {
                return a[key] < b[key] ? 1 : -1;
            })
        }
    },
    watch: {
        data: function () {
            this.makeData();
            var sortedColumn = this.currentColumns.filter(col => col._sortType !== 'normal');
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    mounted() {
        this.makeColumns();
        this.makeData();
    },
    render(h) {
        var _this = this;
        var ths = [];
        var trs = [];

        this.currentColumns.forEach((col, index) => {
            if (col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    h('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByAsc(index)
                            }
                        }
                    }, '↑'),
                    h('a', {
                        class: {
                            on: col._sortType === 'desc',
                        },
                        on: {
                            click: function () {
                                _this.handleSortByDesc(index)
                            }
                        }
                    }, '↓')
                ]))
            } else {
                ths.push(h('th', col.title));
            }
        });

        this.currentData.forEach(row => {
            var tds = [];
            this.currentColumns.forEach(cell => {
                tds.push(h('td', row[cell.key]));
            });
            trs.push(h('tr', tds));
        });

        return h('table', [
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    }
});