<script setup lang="ts">
const features = [
  { title: '品牌信任', desc: '展示合作品牌与数字背书，增强转化信心。' },
  { title: '快速行动', desc: '醒目 CTA 与简明价值点，帮助访客立即注册或咨询。' },
  { title: '多端适配', desc: '使用弹性网格与流式排版，移动端同样舒适。' },
]
</script>

<template>
  <section class="landing">
    <div class="hero">
      <div class="text">
        <p class="tag">精美落地页 · Hero + Feature + CTA</p>
        <h1>用一个页面，讲清楚产品价值</h1>
        <p class="desc">
          通过强视觉的 Hero 区、简洁的亮点栅格和双按钮
          CTA，引导用户完成注册、下载或咨询。主题与暗黑模式随时切换。
        </p>
        <div class="cta">
          <a class="primary" href="#">立即开始</a>
          <a class="ghost" href="#">预约演示</a>
        </div>
        <div class="meta">
          <span>✓ 即时上线</span>
          <span>✓ 无需额外依赖</span>
          <span>✓ 适合快闪活动</span>
        </div>
      </div>
      <div class="visual">
        <div class="gradient"></div>
        <div class="card main">
          <div class="top">
            <div>
              <p class="small">专属体验</p>
              <p class="big">BluePink</p>
            </div>
            <div class="pill">LIVE</div>
          </div>
          <div class="bars">
            <div class="bar" style="width: 86%"></div>
            <div class="bar" style="width: 64%"></div>
            <div class="bar" style="width: 72%"></div>
            <div class="bar" style="width: 58%"></div>
          </div>
          <div class="mini-cards">
            <div class="mini">
              <p class="small">留资</p>
              <p class="value">32%</p>
            </div>
            <div class="mini">
              <p class="small">跳出</p>
              <p class="value">-18%</p>
            </div>
            <div class="mini">
              <p class="small">转化</p>
              <p class="value">+12%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="features">
      <div class="feature-card" v-for="item in features" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <button type="button">了解更多</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 22px;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tag {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.3px;
}

h1 {
  font-size: 32px;
  line-height: 1.3;
  color: var(--color-heading);
}

.desc {
  color: var(--color-text);
  font-size: 16px;
}

.cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.cta a {
  padding: 12px 16px;
  border-radius: 12px;
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

.meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--color-text);
  font-size: 13px;
}

.visual {
  position: relative;
  height: 360px;
}

.gradient {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 118, 184, 0.22), transparent 35%),
    radial-gradient(circle at 70% 40%, rgba(107, 123, 255, 0.32), transparent 45%),
    linear-gradient(135deg, var(--color-background-soft), var(--color-background));
}

.card {
  position: absolute;
  inset: 18px;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.small {
  font-size: 13px;
  color: var(--color-text);
}

.big {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-heading);
}

.pill {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  font-weight: 700;
  color: var(--accent);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0 10px;
}

.bar {
  height: 10px;
  border-radius: 10px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  opacity: 0.9;
}

.mini-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.mini {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 10px;
  background: var(--color-background-soft);
}

.value {
  color: var(--color-heading);
  font-weight: 800;
  font-size: 18px;
}

.features {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.feature-card {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 14px;
  padding: 16px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-card h3 {
  font-size: 18px;
  color: var(--color-heading);
}

.feature-card p {
  color: var(--color-text);
  font-size: 14px;
}

.feature-card button {
  align-self: flex-start;
  margin-top: 6px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
  cursor: pointer;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .visual {
    height: 300px;
  }
}
</style>
