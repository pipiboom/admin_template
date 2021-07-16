import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import Fragment from 'vue-fragment'
// icon
import './icons' 
// 引入插件，放在此处引用是为了下面的router和store中可能会用到某些插件的功能
import './plugins/index'
//引入通用函数
import './utils/index'
// 引入路由
import router from '../router'
// 引入vuex
import store from './store/index'
// 引入bus总线
import bus from './utils/bus'

// import '@/assets/style/utils.less'

// elementUI扩展组件注册
Vue.use(bus)
Vue.use(Fragment.Plugin)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')