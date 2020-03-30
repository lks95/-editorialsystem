import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faWrench, faGlobeAmericas, faCalendarAlt, faClipboardList, faNewspaper, faFile, faUsers, faArchive, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faHome, faWrench, faGlobeAmericas, faCalendarAlt, faClipboardList, faNewspaper, faFile, faUsers, faArchive, faTrash, faEdit, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
