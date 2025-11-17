import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

const doorAdminRoute:RouteRecordRaw = {
    name: 'door_admin',
    path: '/door_admin',
    component: ()=> import('@/pages/door_admin/index.vue'),
    beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (!userStore.isLogin) {
            console.log('进入door前检查：未登录', 'userStore:'+JSON.stringify(userStore))
            next({ name: 'login' }) // 未登录跳转到登录页
        } else {
            console.log('进入door前检查：已登录')
            next() // 已登录继续访问
        }
    }
}

export default doorAdminRoute