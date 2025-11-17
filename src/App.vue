<script setup lang="ts"></script>

<template>
  <div class="app">
    <div class="header">
      <h1 class="logo">舒禾的小世界</h1>
    </div>
    <div class="container">
      <router-view />
    </div>
    <div class="bottom-content" id="bottomContent">
        <div class="cards">
            <div class="card">
                <p><a href="http://beian.miit.gov.cn/">工业和信息化部备案管理系统网站 鲁ICP备2024057562号</a></p>
                <p>主办单位：吕华伟</p>
                <p>Operated by LvHuaWei</p>
                <p>© CopyRight 2020 - 2030. All rights reserved.</p>
                <p>鲁公网安备 37010202000569号</p>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  padding: 20px 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  position: relative;
  display: inline-block;
}

.logo::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .logo {
    font-size: 2rem;
  }
  
  .header {
    padding: 15px 0;
  }
  
  .container {
    padding: 15px;
  }
}
</style>
