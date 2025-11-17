import type { RouteRecordRaw } from 'vue-router'

const yardAdminListmemberRoute:RouteRecordRaw = {
    name: 'yard_admin_listmember',
    path: '/yard_admin_listmember',
    component: ()=> import('@/pages/yard_admin_listmember/index.vue')
}

export default yardAdminListmemberRoute