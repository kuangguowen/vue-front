import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/icon/iconfont.css'

Vue.config.productionTip = false;

//重置我们的样式
// normalize.css
import 'normalize.css/normalize.css'

import iconPicker from 'vue-fontawesome-elementui-icon-picker';
Vue.use(iconPicker);

// 注册一个全局自定义指令 `v-focus`
Vue.directive('hasPrem', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding) {

        let btnPerms = JSON.parse(localStorage.getItem("btnPerm"));
        let value = binding.value;
        let hasPerm = btnPerms.some(item=>value.includes(item.permission));
        if (!hasPerm){
            el.remove();
        }
    }
})


//使用elementUI
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
