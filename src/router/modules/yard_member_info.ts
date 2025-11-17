import type { RouteRecordRaw } from 'vue-router'

const yardMemberInfoRoute:RouteRecordRaw = {
    name: 'yard_member_info',
    path: '/yard_member_info',
    component: ()=> import('@/pages/yard_member_info/index.vue')
}

export default yardMemberInfoRoute