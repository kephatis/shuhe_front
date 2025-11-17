<template>
    <div class="door-container">
        <div class="door-content">
            <el-button type="text" @click="goBack" class="back-button">
                <el-icon><ArrowLeft /></el-icon>
                返回
            </el-button>
            <h1 class="door-title">欢迎 {{ userName }}</h1>
            <p class="door-subtitle">请选择您要访问的页面</p>
            
            <div class="navigation-grid">
                <router-link :to="{name:'yard_member_info'}" class="nav-card">
                    <div class="nav-icon">👥</div>
                    <h3>余额查询</h3>
                </router-link>
                
                <router-link :to="{name:'yard_member_deal'}" class="nav-card">
                    <div class="nav-icon">🌿</div>
                    <h3>工作记录</h3>
                </router-link>
                
                <router-link :to="{name:'yard_password_change'}" class="nav-card">
                    <div class="nav-icon">🔒</div>
                    <h3>修改密码</h3>
                    <p>修改您的登录密码</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/stores/user'
    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { ArrowLeft } from '@element-plus/icons-vue'

    const userStore = useUserStore()
    const router = useRouter()

    const userName = computed(() => {
        return userStore.userInfo?.memberName || '用户'
    })

    const goBack = () => {
        router.go(-1)
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

.door-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.door-content {
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    max-width: 800px;
    width: 100%;
}

.door-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.door-subtitle {
    font-size: 1.1rem;
    color: #718096;
    margin-bottom: 3rem;
}

.navigation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.nav-card {
    display: block;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.nav-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
}

.nav-card:active {
    transform: translateY(-2px);
}

.nav-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.nav-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
}

.nav-card p {
    color: #718096;
    font-size: 0.9rem;
    line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 640px) {
    .door-content {
        padding: 2rem 1.5rem;
        margin: 1rem;
    }
    
    .door-title {
        font-size: 2rem;
    }
    
    .navigation-grid {
        grid-template-columns: 1fr;
    }
}
</style>