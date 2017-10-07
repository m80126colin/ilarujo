import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ROCId from '@/components/ROCId'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    { path: '/roc-id', name: 'ROCId', component: ROCId }
  ]
})
