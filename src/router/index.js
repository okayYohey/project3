import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@/firebase/firestore.js'
import Home from '../views/Home.vue'
import StudApp from '../views/studios/App.vue'
import StudCards from '../views/studios/StudCards.vue'
import StudSignup from '../views/studios/SignUp.vue'
import StudSignin from '../views/studios/SignIn.vue'
import ManagerApp from '../views/manager/App.vue'
import ManagerDashboard from '../views/manager/_authEmail.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false
    },
  },
  {
    path: '/studios',
    name: 'stud-app',
    component: StudApp,
    meta: {
      requiresAuth: false
    },
    children: [{
        path: 'stud-cards',
        name: 'stud-cards',
        component: StudCards,
        meta: {
          requiresAuth: false
        },
      },
      {
        path: 'signin',
        name: 'stud-signin',
        component: StudSignin,
        meta: {
          requiresAuth: false
        },
      },
      {
        path: 'signup',
        name: 'stud-signup',
        component: StudSignup,
        meta: {
          requiresAuth: false
        },
      },
    ]
  },
  {
    path: '/manager',
    name: 'manager-app',
    component: ManagerApp,
    meta: {
      requiresAuth: true
    },
    children: [{
      path: '/manager/:id',
      name: 'auth-email-dashboard',
      component: ManagerDashboard,
      //親と同じ
      meta: {
        requiresAuth: true
      }
    }]
  }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

let firebaseAppDefined = false
setInterval(() => {
  if (!firebaseAppDefined) {
    if (firebase.app()) {
      firebase.name = 'FirebaseYohei'
      firebaseAppDefined = true
    }
  }
}, 2000)

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior,

})

const navguards = router.beforeEach((to, from, next) => {
  // Check for requireedAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT Logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/studios/stud-cards',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route 
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if Logged in
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route 
      next();
    }
  } else {
    next()
  }
})
router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior,
  navguards
})

export default router