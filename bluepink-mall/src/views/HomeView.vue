<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="content">
      <p class="eyebrow">Demo Suite</p>
      <h1>蓝粉商城演示中心</h1>
      <p class="desc">
        快速预览落地页、商品展示和仪表盘三大示例版块，配合一键主题切换，让设计稿和交互演示更直观。
      </p>
      <div class="actions">
        <RouterLink class="primary" to="/landing">立即查看落地页</RouterLink>
        <RouterLink class="ghost" to="/showcase">浏览商品展示</RouterLink>
      </div>
      <div class="pills">
        <span>响应式布局</span>
        <span>轻量动画</span>
        <span>主题切换</span>
        <span>无额外依赖</span>
      </div>
    </div>
    <div class="card">
      <div class="stats">
        <div>
          <p class="label">精选卡片</p>
          <p class="num">12+</p>
        </div>
        <div>
          <p class="label">组件区块</p>
          <p class="num">8</p>
        </div>
        <div>
          <p class="label">主题</p>
          <p class="num">2</p>
        </div>
      </div>
      <div class="preview">
        <div class="preview-row">
          <div class="badge">Hero</div>
          <div class="badge soft">Features</div>
          <div class="badge">CTA</div>
        </div>
        <div class="preview-row muted">
          <div class="bar" style="width: 72%"></div>
          <div class="bar" style="width: 48%"></div>
          <div class="bar" style="width: 84%"></div>
        </div>
        <div class="preview-row cards">
          <div class="mini-card"></div>
          <div class="mini-card"></div>
          <div class="mini-card"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.eyebrow {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.3px;
}

h1 {
  font-size: 34px;
  line-height: 1.25;
  color: var(--color-heading);
}

.desc {
  color: var(--color-text);
  font-size: 16px;
  max-width: 620px;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.actions a {
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 700;
}

.primary {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  box-shadow: 0 12px 26px rgba(107, 123, 255, 0.28);
}

.ghost {
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  background: var(--color-background-soft);
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.pills span {
  padding: 8px 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 13px;
  box-shadow: var(--shadow-card);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.label {
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.8;
}

.num {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-heading);
}

.preview {
  border: 1px dashed var(--color-border);
  border-radius: 14px;
  padding: 12px;
  background: var(--color-background-soft);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview-row {
  display: flex;
  gap: 8px;
}

.badge {
  padding: 6px 12px;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  font-weight: 700;
  font-size: 13px;
}

.badge.soft {
  background: var(--color-background-soft);
}

.preview-row.muted .bar {
  height: 8px;
  border-radius: 8px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  opacity: 0.9;
}

.preview-row.cards {
  gap: 10px;
}

.mini-card {
  flex: 1;
  height: 70px;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
