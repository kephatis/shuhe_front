import { createMemoryHistory, createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import loginRoute from './modules/login'
import doorAdminRoute from './modules/door_admin'
import doorMemberRoute from './modules/door_member'
import yardAdminListmemberRoute from './modules/yard_admin_listmember'
import yardAdminListdealRoute from './modules/yard_admin_listdeal'
import yardMemberInfoRoute from './modules/yard_member_info'
import yardMemberDealRoute from './modules/yard_member_deal'
import yardPasswordChangeRoute from './modules/yard_password_change'


const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: '/login'
    },
    loginRoute,
    doorAdminRoute,
    doorMemberRoute,
    yardAdminListmemberRoute,
    yardAdminListdealRoute,
    yardMemberInfoRoute,
    yardMemberDealRoute,
    yardPasswordChangeRoute
]

const router = createRouter(
    {
        history: createMemoryHistory(),
        //history: createWebHistory(),
        routes,
    }
)

export default router