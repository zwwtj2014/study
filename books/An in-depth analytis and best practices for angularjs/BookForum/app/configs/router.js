"use strict";

// 使用模块的config方法: 回调函数在模块加载时运行, 以便对模块进行配置, 路由就是配置的一种
angular.module("app").config(function($stateProvider, $urlRouterProvider) {
    // 声明一个state
    $stateProvider.state("home", {
        url: "/",
        templateUrl: "controllers/home/index.html",
        controller: "HomeIndexCtrl as vm"
    });

    $stateProvider.state("notFound", {
        url: "/notFound",
        templateUrl: "controllers/home/notFound.html",
        controller: "HomeNotFoundCtrl as vm"
    });

    // 定义默认路由
    $urlRouterProvider.otherwise("/notFound");

    // 定义一个父路由, 只用于提供url
    $stateProvider.state("reader", {
        url: "/reader", // 所有的子路由都会继承这个路由
        template: "<div ui-view></div>",
        abstract: true // 抽象路由, 不能通过url直接访问
    });

    // 根据路由名按照 . 分隔, 前面属于父路由
    $stateProvider.state("reader.create", {
        url: "/create", // 会和父路由的url拼接上, 完整的是/reader/create
        templateUrl: "controllers/reader/create.html",
        controller: "ReaderCreateCtrl as vm"
    });

    $stateProvider.state("thread", {
        url: "/thread",
        template: "<div ui-view></div>",
        abstract: true
    });

    $stateProvider.state("thread.list", {
        url: "/list",
        templateUrl: "controllers/thread/list.html",
        controller: "ThreadListCtrl as vm"
    });

    $stateProvider.state("thread.tree", {
        url: "/tree",
        templateUrl: "controllers/thread/tree.html",
        controller: "ThreadTreeCtrl as vm"
    });
});
