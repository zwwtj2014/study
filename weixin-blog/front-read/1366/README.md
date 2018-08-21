## [如何精确统计页面停留时长](https://mp.weixin.qq.com/s/mnjbc5eeGtwTxdrm73rBrw)

对于常规页面的 首次加载、页面关闭、刷新 等操作都可以通过 `window.onload` 和 `window.onbeforeunload` 事件来监听页面进入和离开，浏览器前进后退可以通过 `pageshow` 和 `pagehide` 处理。 



**目前单页应用主要是基于`browserHistory`或者`hashHistory`来做路由处理**

- `browserHistory`

  - 路由的本质变化都会调用`History.pushState()`和`History.replaceState()`

  - 并且我们可以监控`popstate`事件，该事件只能在浏览器前进后退的时候触发，当调用`history.pushState()`或者`hostory.replaceState`的时候不会触发，所以我们通过增加补丁的方式来解决

    ```js
    let _wr =  function (type) {  
      let orig = window.history[type]
      return  function () {
        let rv = orig.apply(this, arguments)
        let e = new Event(type.toLowerCase())
        e.arguments = arguments
        window.dispatchEvent(e)
        return rv
      }
    }
    window.history.pushState = _wr('pushState')  
    window.history.replaceState = _wr('replaceState')
    window.addEventListener('pushstate',  function (event) {})  
    window.addEventListener('replacestate',  function (event) {})
    ```

![img](https://mmbiz.qpic.cn/mmbiz_jpg/meG6Vo0MeviaOxMvmfIOy2EDrpfja4lb9YXhvvRx97lBblrZbiaML6ykJV1cs3wdLRwGYRWcibTuIXkAibyzNR3RWA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1) 



**监听页面是够处于活跃状态**

- `Page Visibility API`
  - 一个网页的可见状态可以通过 Page Visibility API 获取，比如当用户 切换浏览器Tab、最小化窗口、电脑睡眠 的时候，系统API会派发一个当前页面可见状态变化的 visibilitychange 事件，然后在事件绑定函数中通过 document.hidden 或者 document.visibilityState 读取当前状态。 
- `onblur/onfocus `
  - 