import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@/firebase/firestore.js'
import Home from '../views/Home.vue'
import StudApp from '../views/studios/App.vue'
import StudCards from '../views/studios/StudCards.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import ManagerApp from '../views/manager/App.vue'
import ManagerDashboard from '../views/manager/_authEmail.vue'
import BlogApp from '../views/blogs/App.vue'
import BlogPost from '../views/blogs/_postID.vue'
import CommunityApp from '../views/community/App.vue'
import CommunityBoard from '../views/community/Board.vue'
import CommunityUser from '../views/community/_userID.vue'
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
    }, ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: {
      requiresAuth: false
    },
  }, {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      requiresAuth: false
    },
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
  },
  {
    path: '/blogs',
    name: 'blogs-app',
    component: BlogApp,
    meta: {
      requiresAuth: false
    },
    children: [{
      path: '/blogs/:postid',
      name: 'blogs-post',
      component: BlogPost,
      //親と同じ
      meta: {
        requiresAuth: false
      }
    }]
  },
  {
    path: '/community',
    name: 'community-app',
    component: CommunityApp,
    meta: {
      requiresAuth: false
    },
    children: [{
        path: 'board',
        name: 'community-board',
        component: CommunityBoard,
        //親と同じ
        meta: {
          requiresAuth: false
        }
      },
      {
        path: ':userid',
        name: 'community-post',
        component: CommunityUser,
        meta: {
          requiresAuth: false
        }
      },
    ]
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