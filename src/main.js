import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils/urlconfig.js'
import plugins from './plugins'
import '@/assets/common/css/index.scss'
import '@/utils/xbUeFn.js'
Vue.config.productionTip = false;
Vue.use(plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
