import type { RouteRecordRaw } from 'vue-router'

const loginRoute:RouteRecordRaw = {
    name: 'login',
    path: '/login',
    component: ()=> import('@/pages/login/index.vue')
}

export default loginRoute