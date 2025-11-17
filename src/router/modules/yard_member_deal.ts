import type { RouteRecordRaw } from 'vue-router'

const yardMemberDealRoute:RouteRecordRaw = {
    name: 'yard_member_deal',
    path: '/yard_member_deal',
    component: ()=> import('@/pages/yard_member_deal/index.vue')
}

export default yardMemberDealRoute