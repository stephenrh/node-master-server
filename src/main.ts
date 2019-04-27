import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './plugins/i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
