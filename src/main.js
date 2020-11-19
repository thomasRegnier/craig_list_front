import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuesax from 'vuesax'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import 'vuesax/dist/vuesax.css' //Vuesax styles
import moment from 'moment'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
Vue.prototype.moment = moment
Vue.use(Vuesax, {
    // options here
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
