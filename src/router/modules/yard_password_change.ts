import type { RouteRecordRaw } from 'vue-router'

const yardPasswordChangeRoute:RouteRecordRaw = {
    name: 'yard_password_change',
    path: '/yard_password_change',
    component: ()=> import('@/pages/yard_password_change/index.vue')
}

export default yardPasswordChangeRoute