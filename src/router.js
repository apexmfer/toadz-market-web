import Vue from 'vue'
import Router from 'vue-router'


import Home from './views/Home.vue'

import Account from './views/Account.vue'
import Dashboard from './views/Dashboard.vue'

import Project from './views/Project.vue'

import ProjectsIndex from './views/ProjectsIndex.vue'

import Collection from './views/Collection.vue'
import NftShow from './views/nft/Show.vue'

import RecentActivity from './views/RecentActivity.vue'
 
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({  
  mode: 'history',
  base: process.env.PUBLIC_URL,
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
    },


    {
      path: '/activity/',
      name: 'recentActivity',
      component: RecentActivity
    },

    {
      path: '/account/:address',
      name: 'account',
      component: Account
    },

    {
      path: '/projects/',
      name: 'projectsIndex',
      component: ProjectsIndex
    },



    {
      path: '/project/:projectId',
      name: 'project',
      component: Project
    },

    {
      path: '/collection/:collectionName',
      name: 'collection',
      component: Collection
    },

    

    {
      path: '/collection/:collectionName/:tokenId',
      name: 'NftShow',
      component: NftShow
    },

    

    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },

   
    {
      path: '/*',
      component: NotFound
    },
  ]
})
