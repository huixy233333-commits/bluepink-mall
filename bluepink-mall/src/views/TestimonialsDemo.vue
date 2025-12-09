<script setup lang="ts">
const cases = [
  {
    name: '樱桃家居',
    result: '转化率 +18%',
    quote: '使用演示落地页快速上线，搭配主题切换更贴近品牌感。',
  },
  {
    name: '南风美妆',
    result: '留资率 +12%',
    quote: '卡片展示和 CTA 区块很直观，移动端体验也不错。',
  },
  {
    name: '北辰科技',
    result: '交付周期 -30%',
    quote: '组件演示墙方便复用，一周内完成活动站点搭建。',
  },
]
</script>

<template>
  <section class="testimonials">
    <div class="head">
      <p class="eyebrow">Social Proof · Testimonials</p>
      <h2>口碑案例</h2>
      <p class="desc">三列引用卡片，突出结果与客户名称，适合添加头像或 Logo。</p>
    </div>

    <div class="grid">
      <article v-for="item in cases" :key="item.name" class="card">
        <div class="badge">{{ item.result }}</div>
        <p class="quote">“{{ item.quote }}”</p>
        <p class="name">{{ item.name }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  display: flex;
  flex-direction: column;
  gap: 18px;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 16px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
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

.quote {
  color: var(--color-heading);
  font-weight: 700;
  line-height: 1.5;
}

.name {
  color: var(--color-text);
  font-weight: 600;
}
</style>
