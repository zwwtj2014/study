import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const Routers = [{
    path: '/index',
    meta: {
        title: '首页'
    },
    component: resolve => require(['./views/index.vue'], resolve)
}, {
    path: '/about',
    meta: {
        title: '关于'
    },
    component: resolve => require(['./views/about.vue'], resolve)
}, {
    path: '/user/:id',
    meta: {
        title: '个人主页'
    },
    component: resolve => require(['./views/user.vue'], resolve)
}, {
    path: '*',
    redirect: '/index'
}];

const RouterConfig = {
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

// store中的数据都是响应式的
const store = new Vuex.Store({
    // state数据只能读取, 修改需要通过mutations
    state: {
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    // 修改state中的数据, 尽量不要有异步操作数据
    // 涉及改变数据的使用mutations
    mutations: {
        increment(state, n = 1) {
            state.count += n;
        },
        decrease(state, params) {
            state.count -= params.count;
        }
    },
    // 提交mutation, 主要是包了一层为了解决异步场景问题, 否则完全可以使用mutations搞定
    // 存在业务逻辑的使用actions
    actions: {
        asyncIncrement(context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                }, 1000);
            });
        }
    },
    // 充当store中 computed 的角色
    getters: {
        filteredList: state => {
            return state.list.filter(item => item < 10);
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});