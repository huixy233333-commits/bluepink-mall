<script setup lang="ts">
const badges = ['Light', 'Primary', 'Success', 'Warning', 'Info']
const tags = ['新品', '热卖', '限时', '会员专享']
</script>

<template>
  <section class="components">
    <div class="head">
      <p class="eyebrow">UI Library · 元件墙</p>
      <h2>组件演示</h2>
      <p class="desc">按钮、徽章、标签与卡片示例，可直接拷贝到其他页面。</p>
    </div>

    <div class="block">
      <h3>按钮组</h3>
      <div class="row">
        <button class="btn primary">主按钮</button>
        <button class="btn ghost">次按钮</button>
        <button class="btn soft">幽灵按钮</button>
      </div>
    </div>

    <div class="block">
      <h3>徽章</h3>
      <div class="row">
        <span v-for="item in badges" :key="item" class="badge">{{ item }}</span>
      </div>
    </div>

    <div class="block">
      <h3>标签</h3>
      <div class="row tags">
        <span v-for="item in tags" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>

    <div class="block">
      <h3>信息卡片</h3>
      <div class="card">
        <div>
          <p class="label">指标</p>
          <p class="value">92%</p>
        </div>
        <div class="pill">良好</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.components {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.eyebrow {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--accent);
  font-weight: 700;
}

h2 {
  font-size: 26px;
  color: var(--color-heading);
  margin-top: 8px;
}

.desc {
  color: var(--color-text);
}

.block {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 12px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-weight: 700;
}

.btn.primary {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  border: none;
}

.btn.ghost {
  background: var(--color-background-soft);
  color: var(--color-heading);
}

.btn.soft {
  background: var(--color-surface);
  color: var(--color-heading);
}

.badge {
  padding: 6px 10px;
  border-radius: 10px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  font-weight: 700;
}

.tags .tag {
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-heading);
  font-weight: 700;
}

.card {
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: var(--color-text);
  font-size: 13px;
}

.value {
  color: var(--color-heading);
  font-size: 22px;
  font-weight: 800;
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  font-weight: 700;
}
</style>
