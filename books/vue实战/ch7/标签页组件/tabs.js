Vue.component('tabs', {
    props: {
        // 这里的value是为了使用v-model
        value: {
            type: [String, Number]
        }
    },
    template: `
        <div class="tabs">
            <div class="tabs-bar">
                <!-- 标签页标题, 这里要用v-for -->
                <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">
                    {{ item.label }}
                </div>
            </div>
            <div class="tabs-content">
                <!-- 这里的slot就是嵌套的pane -->
                <slot></slot>
            </div>
        </div>
    `,
    data: function () {
        return {
            currentValue: this.value, // 因为不能修改value, 所以复制一份自己维护
            navList: [] // 用于渲染tabs的标题
        }
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue // 给当前选择的tab加一个class
                }
            ];
        },
        handleChange(index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name; // 改变当前选择的tab, 并处罚下面的watch
            this.$emit('input', name); //更新value
            this.$emit('on-click', name); // 触发一个自定义事件, 供父级使用
        },
        getTabs() {
            return this.$children.filter(item => item.$options.name === 'pane');
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });

                // 如果没有给pane设置name, 默认设置它的索引
                if (!pane.name) {
                    pane.name = index;
                }

                // 设置当前选择的tabs的索引
                if (index === 0) {
                    if (!this.currentValue) {
                        this.currentValue = pane.name || index;
                    }
                }
            });

            this.updateStatus();
        },

        updateStatus() {
            var tabs = this.getTabs();
            tabs.forEach(tab => {
                return tab.show = tab.name === this.currentValue
            });
        }
    },
    watch: {
        value(nVal) {
            this.currentValue = nVal;
        },
        currentValue(nVal) {
            this.updateStatus(); // 在当前选择的tab发生变化时, 更新pane的显示状态
        }
    }
});