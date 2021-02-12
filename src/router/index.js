import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import firebase from 'firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (async (to, from, next) => {
      const user = await firebase.getCurrentUserClaims()
      if (user != null){
        if (!user.claims.isMember && !user.claims.isAdmin) {
          return next('status-pending');
        }
        return next('dashboard');
      }
      next();
    })
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: (async (to, from, next) => {
      const user = await firebase.getCurrentUserClaims();
      if (!user.claims.isMember && !user.claims.isAdmin){
        next('status-pending');
      } else{
        next();
      }
    }),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Dashboard/Home.vue')
      },
      {
        path: 'ingredients',
        name: 'Ingredients',
        component: () => import('../views/Dashboard/Ingredients.vue')
      },
      {
        path: 'packaging',
        name: 'Packaging',
        component: () => import('../views/Dashboard/Packaging.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Dashboard/Products.vue'),
        children: [
          {
            path: '',
            name: 'ProductsDashboard',
            component: () => import('../views/Dashboard/dashboards/ProductsDashboard.vue')
          },
          {
            path: ':id',
            name: 'ProductScreen',
            component: () => import('../views/Dashboard/Screens/ProductScreen.vue') 
          }
        ]
      },
      {
        path: 'user',
        name: 'User',
        compontent: () => import('../views/Dashboard/admin/User.vue'),
        beforeEnter: (async (to, from, next) => {
          const user = await firebase.getCurrentUserClaims();
          if (!user.claims.isAdmin){
            next('dashboard');
          } else{
            next();
          }
        }),
      }
    ]
  },
  {
    path: '/status-pending',
    name: 'status-pending',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Status-pending.vue'),
    afterEnter: (async (to, from, next) => {
      const user = await firebase.getCurrentUserClaims();
      if (user.claims.isMember || user.claims.isAdmin){
        next('status-pending');
      } else{
        next();
      }
    }),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;