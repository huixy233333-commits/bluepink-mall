<script setup lang="ts">
const plans = [
  {
    name: '入门',
    price: '¥29 / 月',
    desc: '适合个人或小团队试水',
    highlights: ['1 个发布站点', '基础组件包', '邮件支持'],
  },
  {
    name: '专业',
    price: '¥79 / 月',
    desc: '适合成长型团队与活动页',
    highlights: ['3 个发布站点', '高级组件包', '优先支持'],
  },
  {
    name: '旗舰',
    price: '¥199 / 月',
    desc: '多团队协作与高并发场景',
    highlights: ['不限发布站点', 'A/B 测试', 'SLA 与专属顾问'],
  },
]
</script>

<template>
  <section class="pricing">
    <div class="head">
      <p class="eyebrow">Pricing · 三档卡片</p>
      <h2>价格方案示例</h2>
      <p class="desc">兼顾亮点、CTA 与基础说明的价格卡片，可直接复用。</p>
    </div>

    <div class="grid">
      <article
        v-for="plan in plans"
        :key="plan.name"
        class="card"
        :class="{ featured: plan.name === '专业' }"
      >
        <div class="badge" v-if="plan.name === '专业'">推荐</div>
        <h3>{{ plan.name }}</h3>
        <p class="price">{{ plan.price }}</p>
        <p class="plan-desc">{{ plan.desc }}</p>
        <ul>
          <li v-for="item in plan.highlights" :key="item">{{ item }}</li>
        </ul>
        <button type="button" class="primary">立即选择</button>
        <button type="button" class="ghost">了解详情</button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.head .eyebrow {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--accent);
  font-weight: 700;
}

.head h2 {
  font-size: 26px;
  color: var(--color-heading);
  margin-top: 8px;
}

.desc {
  color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.card {
  position: relative;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card.featured {
  border-color: var(--accent);
  box-shadow: 0 14px 32px rgba(107, 123, 255, 0.24);
}

.badge {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  font-weight: 700;
  font-size: 12px;
}

h3 {
  color: var(--color-heading);
  font-size: 20px;
}

.price {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-heading);
}

.plan-desc {
  color: var(--color-text);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--color-text);
}

li::before {
  content: '✓';
  color: var(--accent);
  margin-right: 8px;
  font-weight: 800;
}

button {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  font-weight: 700;
  cursor: pointer;
}

.primary {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  border: none;
}

.ghost {
  background: var(--color-background-soft);
  color: var(--color-heading);
}
</style>
