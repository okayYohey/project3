import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from '@/firebase/firestore.js'
import {
  nextTick
} from 'q'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueMeta from 'vue-meta';

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      VueMeta,
      render: h => h(App)
    }).$mount('#app')
  } else {
    nextTick(user)
  }
})

export const eventBus = new Vue()