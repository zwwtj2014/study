<template>
    <div>
        <h1>首页</h1>
        {{count}}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleAsyncIncrement">async +1</button>
        <hr>
        {{list}}
        <hr>
        随机增加: <Counter :number="number"></Counter>
        <hr>
        <router-link to="/about" tag="li">跳转到 about</router-link>
    </div>
</template>

<script>
import Counter from './Counter.vue';

export default {
    components: {
        Counter
    },
    data() {
        return {
            number: 0
        };
    },

    created() {
        this.$bus.on('add', this.handleAddRandom);
    },
    beforeDestroy() {
        this.$bus.off('add', this.handleAddRandom);
    },
    computed: {
        count() {
            return this.$store.state.count;
        },
        list() {
            return this.$store.getters.filteredList;
        }
    },
    methods: {
        handleIncrement() {
            this.$store.commit('increment', 5);
        },
        handleDecrease() {
            this.$store.commit({
                type: 'decrease',
                count: 4
            });
        },
        handleAsyncIncrement() {
            this.$store
                .dispatch('asyncIncrement')
                .then(() => {
                    console.log(this.$store.state.count);
                })
                .catch(err => {});
        },
        handleAddRandom(num) {
            this.number += num;
        }
    }
};
</script>
