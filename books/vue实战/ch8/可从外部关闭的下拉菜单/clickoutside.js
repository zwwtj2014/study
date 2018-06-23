Vue.directive('clickoutside', {
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },

    update(el, binding) {
        console.log(el);
        console.log(binding);
    },
    unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside);
        delete el.__vueClickOutside;
    }
});