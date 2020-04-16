import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faWrench, faGlobeAmericas, faCalendarAlt, faClipboardList, faNewspaper, faFile, faUsers, faArchive, faTrash, faEdit, faPlus, faUndo, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faHome, faWrench, faGlobeAmericas, faCalendarAlt, faClipboardList, faNewspaper, faFile, faUsers, faArchive, faTrash, faEdit, faPlus, faUndo, faChevronUp, faChevronDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
