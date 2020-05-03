import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './plugins/vuex';
import i18n from './plugins/i18n'
import {func} from '@/plugins/helpers';
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.prototype.$func = func;

window.dict =new Vue({
  vuetify,
  i18n,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('initStore');
  }
}).$mount('#app');


