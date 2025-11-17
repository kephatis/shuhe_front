<template>
    <div class="password-change-container">
        <div class="password-change-content">
            <el-button type="text" @click="goBack" class="back-button">
                <el-icon><ArrowLeft /></el-icon>
                返回
            </el-button>
            <h1 class="password-change-title">修改密码</h1>
            <p class="password-change-subtitle">为确保账户安全，请定期修改密码</p>
            
            <div class="form-container">
                <div class="form-group">
                    <label class="form-label">原密码</label>
                    <el-input
                        v-model="formData.oldPassword"
                        type="password"
                        placeholder="请输入原密码"
                        show-password
                        class="form-input"
                    />
                </div>
                
                <div class="form-group">
                    <label class="form-label">新密码</label>
                    <el-input
                        v-model="formData.newPassword"
                        type="password"
                        placeholder="请输入新密码"
                        show-password
                        class="form-input"
                    />
                </div>
                
                <div class="form-group">
                    <label class="form-label">确认新密码</label>
                    <el-input
                        v-model="formData.confirmPassword"
                        type="password"
                        placeholder="请再次输入新密码"
                        show-password
                        class="form-input"
                    />
                </div>
                
                <div class="button-group">
                    <button 
                        type="button" 
                        @click="handleChangePassword"
                        :loading="loading"
                        style="background:#4096ff"
                        class="el-button--primary el-button--small submit-btn"
                    >
                        确认修改
                    </button>
                    <button 
                        type="button" 
                        @click="handleReset"
                        style="background-color: rgb(217,236,255)"
                        class="el-button--small reset-btn"
                    >
                        重置
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { httpMemberChangePasswordMy } from '@/http/member'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ArrowLeft } from '@element-plus/icons-vue'
import md5 from 'md5'

const router = useRouter()
const loading = ref(false)

const goBack = () => {
    router.go(-1)
}

const formData = reactive({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    // 验证表单
    const validateForm = () => {
        if (!formData.oldPassword) {
            ElMessage.warning('请输入原密码')
            return false
        }
        
        if (!formData.newPassword) {
            ElMessage.warning('请输入新密码')
            return false
        }
        
        if (formData.newPassword.length < 6) {
            ElMessage.warning('新密码长度不能少于6位')
            return false
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
            ElMessage.warning('两次输入的新密码不一致')
            return false
        }
        
        if (formData.oldPassword === formData.newPassword) {
            ElMessage.warning('新密码不能与原密码相同')
            return false
        }
        
        return true
    }

    // 修改密码
    const handleChangePassword = async () => {
        if (!validateForm()) {
            return
        }
        
        try {
            loading.value = true
            
            const response = await httpMemberChangePasswordMy(md5(formData.oldPassword), md5(formData.newPassword))
            
            if (response.code === 1) {
                await ElMessageBox.alert('密码修改成功', '操作成功', {
                    confirmButtonText: '确定',
                    type: 'success'
                })
                    
                // 跳转到登录页
                router.push({ name: 'login' })
            } else {
                ElMessage.error(response.message || '密码修改失败')
            }
        } catch (error) {
            console.error('修改密码失败:', error)
            ElMessage.error('修改密码失败，请稍后重试')
        } finally {
            loading.value = false
        }
    }

    // 重置表单
    const handleReset = () => {
        formData.oldPassword = ''
        formData.newPassword = ''
        formData.confirmPassword = ''
        ElMessage.info('表单已重置')
    }
</script>

<style scoped>
.back-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px 10px;
    padding: 10px 20px;
    color: #667eea;
    font-weight: 500;
    border: 1px solid #667eea;
    border-radius: 4px;
    background-color: rgba(102, 126, 234, 0.1);
    transition: all 0.3s ease;
}

.back-button:hover {
    background-color: rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);
}

.password-change-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.password-change-content {
    background: rgba(255, 255, 255, 0.95);
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    max-width: 500px;
    width: 100%;
    text-align: center;
}

.password-change-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.password-change-subtitle {
    font-size: 1rem;
    color: #718096;
    margin-bottom: 2rem;
}

.form-container {
    text-align: left;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
    font-size: 0.9rem;
}

.form-input {
    width: 100%;
}

.button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: flex-start;
}

.submit-btn {
    width: 200px;
    height: 45px;
    font-size: 1rem;
    font-weight: 500;
}

.reset-btn {
    width: 200px;
    height: 45px;
    font-size: 1rem;
    font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 640px) {
    .password-change-content {
        padding: 2rem 1.5rem;
        margin: 1rem;
    }
    
    .password-change-title {
        font-size: 1.5rem;
    }
    
    .button-group {
        flex-direction: column;
    }
    
    .submit-btn,
    .reset-btn {
        flex: auto;
        width: 100%;
    }
}
</style>