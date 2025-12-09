<script setup lang="ts">
const stats = [
  { label: '本周 GMV', value: '¥ 2,180,000', change: '+12.4%' },
  { label: '下单转化', value: '4.8%', change: '+0.6%' },
  { label: '复购率', value: '26.3%', change: '+1.3%' },
  { label: '客服响应', value: '98%', change: '稳健' },
]

const activities = [
  { title: '新品「云端椅」启动预售', time: '今天 · 09:00' },
  { title: '联合品牌直播预约 2.1w', time: '昨天 · 21:00' },
  { title: 'A/B 测试版本 B 转化 +8%', time: '昨天 · 15:10' },
  { title: '物流体验评分上升至 4.7', time: '本周' },
]
</script>

<template>
  <section class="dashboard">
    <header class="head">
      <div>
        <p class="eyebrow">Dashboard · Cards + 图表占位</p>
        <h2>运营仪表盘示例</h2>
        <p class="desc">轻量卡片、迷你图和列表，适合快速展示关键指标。</p>
      </div>
      <button class="primary" type="button">导出周报</button>
    </header>

    <div class="stat-grid">
      <div v-for="item in stats" :key="item.label" class="stat-card">
        <p class="label">{{ item.label }}</p>
        <p class="value">{{ item.value }}</p>
        <p class="change">{{ item.change }}</p>
        <div class="spark">
          <div class="line"></div>
          <div class="line short"></div>
          <div class="line"></div>
          <div class="line tall"></div>
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel chart">
        <div class="panel-head">
          <p class="title">7 日趋势</p>
          <span class="pill">销量/访客/收藏</span>
        </div>
        <div class="chart-area">
          <div class="line soft"></div>
          <div class="line"></div>
          <div class="line soft"></div>
          <div class="line tall"></div>
        </div>
      </div>

      <div class="panel list">
        <div class="panel-head">
          <p class="title">活动动态</p>
          <span class="pill">实时</span>
        </div>
        <ul>
          <li v-for="item in activities" :key="item.title">
            <div>
              <p class="item-title">{{ item.title }}</p>
              <p class="item-time">{{ item.time }}</p>
            </div>
            <button type="button">查看</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
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
  font-size: 24px;
  color: var(--color-heading);
  margin-top: 8px;
}

.desc {
  color: var(--color-text);
}

.primary {
  padding: 10px 14px;
  border-radius: 12px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  border: none;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(107, 123, 255, 0.3);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.stat-card {
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 12px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 13px;
  color: var(--color-text);
}

.value {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-heading);
}

.change {
  color: var(--accent);
  font-weight: 700;
}

.spark {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  align-items: end;
  margin-top: 6px;
}

.line {
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  opacity: 0.9;
}

.line.short {
  height: 16px;
  opacity: 0.7;
}

.line.tall {
  height: 34px;
}

.panels {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 12px;
}

.panel {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 14px;
  padding: 14px;
  box-shadow: var(--shadow-card);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.title {
  font-weight: 800;
  color: var(--color-heading);
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  font-size: 12px;
  font-weight: 700;
}

.chart-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  height: 180px;
  align-items: end;
}

.chart-area .line {
  width: 100%;
}

.chart-area .line.soft {
  opacity: 0.6;
}

.chart-area .line.tall {
  height: 170px;
}

.list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

.item-title {
  font-weight: 700;
  color: var(--color-heading);
}

.item-time {
  color: var(--color-text);
  font-size: 13px;
}

.list button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-heading);
  cursor: pointer;
}

@media (max-width: 900px) {
  .panels {
    grid-template-columns: 1fr;
  }
}
</style>
