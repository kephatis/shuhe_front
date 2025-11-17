<template>
    <div class="content-container">
        <el-button type="text" @click="goBack" class="back-button">
            <el-icon><ArrowLeft /></el-icon>
            返回
        </el-button>
    </div>
    <div>
        yard_member_deal
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

const goBack = () => {
    router.go(-1)
}

</script>

<style scoped>
.content-container {
    padding: 20px;
}

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
</style>