import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/sections/Profile.vue'
import ProfileForm from '@/components/sections/ProfileForm.vue'
import Web3Message from '@/components/sections/Web3Message.vue'
import Roller from '@/components/Roller'
import RollerRank from '@/components/sections/RollerRank.vue'
import AdminNbaTron from '@/components/AdminNbaTron'
import CandyList from '@/components/CandyList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Home,
      meta: { view: Web3Message }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { view: Web3Message }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { view: Profile }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: Home,
      meta: { view: ProfileForm }
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: Dashboard,
      meta: { view: ProfileForm }
    },
    {
      path: '/roller',
      name: 'Roller',
      component: Roller,
      meta: { view: RollerRank }
    },
    {
      path: '/admin/',
      name: 'AdminNbaTron',
      component: AdminNbaTron,
      meta: { view: Web3Message }
    },
    {
      path: '/admin/candy/list/',
      name: 'CandyList',
      component: CandyList,
      meta: { view: Web3Message }
    }
  ]
})
