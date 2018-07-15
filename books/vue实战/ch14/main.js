import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Routers from './router';
import App from './app.vue';

import './style.css';

import product_data from './product';

Vue.use(VueRouter);
Vue.use(Vuex);

const RouterConfig = {
    // 使用H5的History路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

function getFilterArray(arr) {
    const res = [];
    const json = {};
    for (let i = 0; i < arr.length; i++) {
        const _self = arr[i];
        if (!json[_self]) {
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}

const store = new Vuex.Store({
    state: {
        productList: [], // 商品列表数据
        cartList: [] // 购物车数据
    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        colors: state => {
            const colors = state.productList.map(item => item.colors);
            return getFilterArray(colors);
        }
    },
    mutations: {
        setProductList(state, data) {
            state.productList = data;
        },
        addCart(state, id) {
            const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded) {
                isAdded.count++;
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                });
            }
        },

        editCartCount(state, payload) {
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        deleteCart(state, id) {
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, i);
        }
    },
    actions: {
        // 请求商品列表
        getProductList(context) {
            // 真实环境通过Ajax获取, 这里用异步模拟
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});