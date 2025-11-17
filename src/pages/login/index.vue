<template>
    <div class="login-container">
        <div class="login-form">
            <h2 class="login-title">用户登录</h2>
            <div class="form-group">
                <label class="form-label">用户名:</label>
                <input type="text" v-model="formdata.loginName" class="form-input" placeholder="请输入用户名" />
            </div>
            <div class="form-group">
                <label class="form-label">密码:</label>
                <input type="password" v-model="formdata.password" class="form-input" placeholder="请输入密码" />
            </div>
            <button @click="login" class="login-btn">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '../../stores/user'
    import { useRouter } from 'vue-router'
    import { httpAuthLogin, httpAuthLogout, type httpAuthLoginRequest, type httpAuthLoginResponse} from '@/http/auth'
    import { httpMemberIndex,httpMemberCompleteOnceAd,httpMemberMemberListAd,httpMemberInfoListAd,
        httpMemberMoneyMy,httpMemberInfoMy,httpMemberDealListMy,httpMemberChangePasswordMy } from '@/http/member'
    import { onMounted, reactive, ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import md5 from 'md5'


    const userStore = useUserStore();
    const router = useRouter()
    const loading = ref(false)
    
    const formdata = reactive({
        loginName: userStore.getLoginName,
        password: ''
    })

    const login = async () => {
        if (!formdata.loginName || !formdata.password) {
            ElMessage.warning('请输入用户名和密码')
            return
        }

        loading.value = true
        try {
            console.log('start login ...')
            // 对密码进行MD5加密
            const encryptedPassword = md5(formdata.password)
            console.log('password md5:', encryptedPassword)
            
            const loginData: httpAuthLoginRequest = {
                username: formdata.loginName,
                password: encryptedPassword
            }
            
            const response = await httpAuthLogin(loginData)
            
            if (response.code === 1) {
                userStore.setLoginInfo(response.data)
                userStore.updateLoginName(formdata.loginName)
                userStore.updateUserName(response.data.userInfo.memberName)
                ElMessage.success('登录成功')
                console.log('登录成功, token:', response.data.token)
                console.log('登录成功, userInfo:', response.data.userInfo)
                
                // 根据用户角色跳转到不同页面
                const userRoles = response.data.userInfo?.roles || []
                console.log('用户角色:', userRoles)
                
                if (userRoles.includes('admin')) {
                    // 管理员跳转到管理员门禁页面
                    router.push({ name: 'door_admin' })
                } else {
                    // 普通用户跳转到会员门禁页面
                    router.push({ name: 'door_member' })
                }
            } else {
                ElMessage.error(response.message || '登录失败')
            }
        } catch (error) {
            console.error('login error:', error)
            ElMessage.error('登录请求失败')
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        // 检查是否已登录
        if (userStore.isLogin) {
            console.log('用户已登录:', userStore.getUserName)
        }
    })
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.login-btn {
    width: 100%;
    padding: 0.75rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-btn:hover {
    background: #5a67d8;
}

.login-btn:active {
    background: #4c51bf;
}
</style>