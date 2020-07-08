import Vue from 'vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import Multiselect from 'vue-multiselect'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faWrench, faGlobeAmericas, faCalendarAlt, faClipboardList, faNewspaper, faFile, faUsers, faArchive, faTrash, faEdit, faPlus, faUndo, faChevronUp, faChevronDown, faGripVertical, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faQuoteRight, faStrikethrough, faUnderline, faRedo, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

 
library.add(faHome, faWrench, faGlobeAmericas, faCalendarAlt, faClipboardList, faNewspaper, faFile, faUsers, faArchive, faTrash, faEdit, faPlus, faUndo, faChevronUp, faChevronDown, faGripVertical, faBold, faItalic, faCode, faParagraph, faListUl, faListOl, faQuoteRight, faStrikethrough, faUnderline, faRedo, faChevronRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)
Vue.use(Multiselect)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
