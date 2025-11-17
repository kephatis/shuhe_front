import { defineStore } from 'pinia'
import type { httpAuthLoginResponse } from '@/http/auth'

interface UserState {
    token: string
    userInfo: {
        memberId: string
        memberName: string
        avatar?: string
        roles: string[]
    } | null
    isLogin: boolean
    loginName: string
}

export const useUserStore = defineStore('userStore', {
    state: (): UserState => {
        return {
            token: localStorage.getItem('token') || '',
            userInfo: null,
            isLogin: false,
            loginName: localStorage.getItem('loginName') || ''
        }
    },
    getters: {
        getStatus: (state) => {
            return state.isLogin ? '已登录' : '未登录'
        },
        getUserName: (state) => {
            return state.userInfo?.memberName || ''
        },
        getUserId: (state) => {
            return state.userInfo?.memberId || ''
        },
        getUserRoles: (state) => {
            return state.userInfo?.roles || []
        },
        getLoginName: (state) => {
            return state.loginName || ''
        }
    },
    actions: {
        setLoginInfo(loginData: httpAuthLoginResponse) {
            this.token = loginData.token
            this.userInfo = loginData.userInfo
            this.isLogin = true
            localStorage.setItem('token', loginData.token)
        },
        clearLoginInfo() {
            this.token = ''
            this.userInfo = null
            this.isLogin = false
            localStorage.removeItem('token')
            localStorage.removeItem('loginName')
        },
        updateUserName(name: string = '') {
            if (this.userInfo) {
                this.userInfo.memberName = name
            }
        },
        updateLoginName(name: string = '') {
            this.loginName = name
            localStorage.setItem('loginName', name)
        }
    }
})