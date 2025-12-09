<script setup lang="ts">
const filters = ['全部', '新品', '热卖', '限时', '会员']

const products = [
  { name: '云端轻羽椅', tag: '新品', price: '￥899', badge: 'Soft Pink' },
  { name: '北欧原木桌', tag: '热卖', price: '￥1599', badge: 'Natural' },
  { name: '玻璃花瓶套组', tag: '限时', price: '￥199', badge: 'Clear' },
  { name: '极简吊灯', tag: '会员', price: '￥699', badge: 'Warm' },
  { name: '云感抱枕', tag: '热卖', price: '￥129', badge: 'Cloud' },
  { name: '纤维地毯', tag: '新品', price: '￥399', badge: 'Soft' },
]
</script>

<template>
  <section class="showcase">
    <header class="top">
      <div>
        <p class="eyebrow">Product Cards · Hover 动效</p>
        <h2>商品展示栅格</h2>
        <p class="desc">无框架依赖的卡片示例，含标签、价格、徽标与悬停动画。</p>
      </div>
      <div class="filter">
        <button v-for="item in filters" :key="item" type="button">{{ item }}</button>
      </div>
    </header>

    <div class="grid">
      <article v-for="item in products" :key="item.name" class="card">
        <div class="thumb">
          <div class="badge">{{ item.badge }}</div>
        </div>
        <div class="body">
          <p class="tag">{{ item.tag }}</p>
          <h3>{{ item.name }}</h3>
          <p class="price">{{ item.price }}</p>
        </div>
        <div class="footer">
          <button type="button">加入收藏</button>
          <button type="button" class="ghost">查看详情</button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
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
  font-size: 26px;
  color: var(--color-heading);
  margin-top: 8px;
}

.desc {
  color: var(--color-text);
}

.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-heading);
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.12);
}

.thumb {
  height: 150px;
  background: linear-gradient(145deg, rgba(107, 123, 255, 0.18), rgba(255, 118, 184, 0.22));
  position: relative;
}

.badge {
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--color-border);
  font-weight: 700;
  color: var(--color-heading);
}

.body {
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tag {
  font-size: 12px;
  color: var(--accent);
  font-weight: 700;
}

.body h3 {
  color: var(--color-heading);
  font-size: 17px;
}

.price {
  color: var(--color-text);
  font-weight: 700;
}

.footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 14px 14px;
}

.footer button {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.footer button.ghost {
  background: var(--color-background-soft);
  color: var(--color-heading);
}
</style>
