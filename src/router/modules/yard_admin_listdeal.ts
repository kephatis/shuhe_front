import type { RouteRecordRaw } from 'vue-router'

const yardAdminListdealRoute:RouteRecordRaw = {
    name: 'yard_admin_listdeal',
    path: '/yard_admin_listdeal',
    component: ()=> import('@/pages/yard_admin_listdeal/index.vue')
}

export default yardAdminListdealRoute