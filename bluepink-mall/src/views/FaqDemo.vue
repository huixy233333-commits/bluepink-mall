<script setup lang="ts">
const faqs = [
  { q: '演示代码是否有依赖？', a: '全部基于基础 CSS 与 Vue 组件，无需额外库即可运行。' },
  { q: '如何切换主题？', a: '点击右上角按钮即可在明/暗模式间切换，并自动记忆偏好。' },
  { q: '可以接入真实数据吗？', a: '可以，将占位卡片替换为真实接口数据即可，样式已准备好。' },
  { q: '移动端表现怎样？', a: '布局使用弹性网格与流式排版，主要区块已做响应式适配。' },
]
</script>

<template>
  <section class="faq">
    <div class="head">
      <p class="eyebrow">FAQ · 手风琴列表</p>
      <h2>常见问题</h2>
      <p class="desc">轻量 Q&A 列表，适合补充说明、指引或售后信息。</p>
    </div>

    <div class="list">
      <details v-for="item in faqs" :key="item.q">
        <summary>{{ item.q }}</summary>
        <p>{{ item.a }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq {
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

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

details {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  padding: 10px 12px;
}

summary {
  cursor: pointer;
  font-weight: 700;
  color: var(--color-heading);
}

p {
  margin-top: 8px;
  color: var(--color-text);
}
</style>
