<template>
    <div class="content-container">
        <el-button type="text" @click="goBack" class="back-button">
            <el-icon><ArrowLeft /></el-icon>
            返回
        </el-button>

        <!-- 搜索框和检索按钮 -->
        <div class="search-container">
            <el-input v-model="searchText" placeholder="请输入搜索内容" class="search-input" />
            <el-button type="primary" @click="handleSearch" class="search-button">检索</el-button>
        </div>

        <!-- 排序选择器和排序按钮 -->
        <div class="sort-container">
            <el-select v-model="sortField" placeholder="选择排序字段" class="sort-select">
                <el-option label="id" value="memberId" />
                <el-option label="名称" value="memberName" />
                <el-option label="时间" value="registerTime" />
            </el-select>
            <el-button @click="toggleSortOrder" class="sort-button">
                <el-icon v-if="sortOrder === 'asc'"><ArrowUp /></el-icon>
                <el-icon v-else><ArrowDown /></el-icon>
            </el-button>
        </div>

        <!-- 会员列表 -->
        <div class="member-list">
            <el-table :data="memberList" style="width: 100%">
                <el-table-column prop="memberId" label="id" v-if="false" />
                <el-table-column prop="memberName" label="名称" />
                <el-table-column prop="balance" label="余额" />
                <el-table-column prop="registerTime" label="时间" />
            </el-table>
        </div>

        <!-- 分页组件 -->
        <div class="pagination-container">
            <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="totalMembers"
                layout="prev, pager, next, jumper"
                @current-change="handlePageChange"
            >
                <template #prev>
                    <el-button><el-icon><ArrowLeft /></el-icon></el-button>
                </template>
                <template #next>
                    <el-button><el-icon><ArrowRight /></el-icon></el-button>
                </template>
                <template #jumper>
                    <el-input v-model="jumpPage" style="width: 60px" />
                    <el-button @click="handleJumpPage">跳转</el-button>
                </template>
            </el-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import { httpMemberMemberListAd } from '@/http/member';

const router = useRouter();

// 返回按钮逻辑
const goBack = () => {
    router.go(-1);
};

// 搜索相关
const searchText = ref('');
const handleSearch = () => {
    fetchMembers();
};

// 排序相关
const sortField = ref('memberId');
const sortOrder = ref('asc');
const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    fetchMembers();
};

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalMembers = ref(0);
const jumpPage = ref('');

const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchMembers();
};

const handleJumpPage = () => {
    const page = parseInt(jumpPage.value);
    if (page >= 1 && page <= Math.ceil(totalMembers.value / pageSize.value)) {
        currentPage.value = page;
        fetchMembers();
    }
};

// 会员列表数据
const memberList = ref([]);

// 获取会员列表
const fetchMembers = async () => {
    try {
        const response = await httpMemberMemberListAd(
            currentPage.value,
            pageSize.value,
            searchText.value
        );
        if (response.code === 1) {
            memberList.value = response.data.list;
            totalMembers.value = response.data.total;
        }
    } catch (error) {
        console.error('获取会员列表失败:', error);
    }
};

// 初始化数据
onMounted(() => {
    fetchMembers();
});
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

.search-container {
    display: flex;
    margin-bottom: 20px;
}

.search-input {
    flex: 1;
    margin-right: 10px;
}

.sort-container {
    display: flex;
    margin-bottom: 20px;
}

.sort-select {
    width: 200px;
    margin-right: 10px;
}

.member-list {
    margin-bottom: 20px;
}

.pagination-container {
    display: flex;
    justify-content: center;
}
</style>