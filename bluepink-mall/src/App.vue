<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const THEME_KEY = 'demo-theme'
const theme = ref<'light' | 'dark'>('light')
const route = useRoute()
const demoPages = [
  { label: '落地页', path: '/landing' },
  { label: '商品展示', path: '/showcase' },
  { label: '仪表盘', path: '/dashboard' },
  { label: '价格方案', path: '/pricing' },
  { label: '口碑案例', path: '/testimonials' },
  { label: 'FAQ / 支持', path: '/faq' },
  { label: '组件演示', path: '/components' },
  { label: 'ECharts 图表', path: '/echarts' },
]

const mapPages = [
  { label: '2D 地图', path: '/map-2d' },
  { label: '3D 地图', path: '/map-3d' },
  { label: 'Three.js 演示', path: '/map-three' },
  { label: '3D 场景查询', path: '/map-3d-query' },
  { label: '基础地图', path: '/start-map' }
]

let mediaQuery: MediaQueryList | null = null
let removeListener: (() => void) | null = null

const applyTheme = (value: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', value)
  localStorage.setItem(THEME_KEY, value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyTheme(theme.value)
}

const activeClass = (path: string) => (route.path === path ? 'active' : '')

const themeLabel = computed(() => (theme.value === 'light' ? '🌙 深色' : '☀️ 浅色'))
const isDemoActive = computed(() => demoPages.some((page) => route.path.startsWith(page.path)))
const isMapActive = computed(() => mapPages.some((page) => route.path.startsWith(page.path)))

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const saved = localStorage.getItem(THEME_KEY)
  const initial =
    saved === 'light' || saved === 'dark' ? saved : mediaQuery.matches ? 'dark' : 'light'

  theme.value = initial
  applyTheme(initial)

  const handleSystemChange = (event: MediaQueryListEvent) => {
    const stored = localStorage.getItem(THEME_KEY)
    if (!stored) return
    const current =
      stored === 'light' || stored === 'dark' ? stored : event.matches ? 'dark' : 'light'
    theme.value = current
    applyTheme(current)
  }

  mediaQuery.addEventListener('change', handleSystemChange)
  removeListener = () => mediaQuery?.removeEventListener('change', handleSystemChange)
})

onBeforeUnmount(() => {
  removeListener?.()
})
</script>

<template>
  <div class="layout">
    <header class="app-header">
      <div class="brand">
        <img class="logo" src="@/assets/logo.svg" alt="logo" />
        <div class="brand-text">
          <span class="title">BluePink Mall</span>
          <span class="subtitle">演示体验中心</span>
        </div>
      </div>
      <nav class="nav">
        <RouterLink to="/" :class="activeClass('/')">首页</RouterLink>
        <div class="dropdown" :class="{ active: isDemoActive }">
          <span class="trigger">演示</span>
          <div class="menu">
            <RouterLink
              v-for="item in demoPages"
              :key="item.path"
              :to="item.path"
              :class="activeClass(item.path)"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
        <div class="dropdown" :class="{ active: isMapActive }">
          <span class="trigger">地图演示</span>
          <div class="menu">
            <RouterLink
              v-for="item in mapPages"
              :key="item.path"
              :to="item.path"
              :class="activeClass(item.path)"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
        <RouterLink to="/about" :class="activeClass('/about')">关于</RouterLink>
      </nav>
      <button class="theme-btn" type="button" @click="toggleTheme">
        {{ themeLabel }}
      </button>
    </header>

    <main class="page">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.app-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 46px;
  height: 46px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-weight: 700;
  font-size: 18px;
  color: var(--color-heading);
}

.subtitle {
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.8;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  position: relative;
}

.nav a {
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 600;
  color: var(--color-text);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.nav a:hover {
  background: var(--color-background-soft);
  border-color: var(--color-border);
}

.dropdown {
  position: relative;
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 600;
  color: var(--color-text);
  border: 1px solid transparent;
  cursor: default;
}

.dropdown .trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dropdown .menu {
  position: absolute;
  top: 115%;
  left: 0;
  min-width: 170px;
  display: grid;
  gap: 6px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: all 0.18s ease;
  z-index: 10;
}

.dropdown:hover .menu,
.dropdown:focus-within .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown .menu a {
  border: 1px solid transparent;
  padding: 8px 10px;
  border-radius: 10px;
  color: var(--color-heading);
}

.dropdown .menu a:hover {
  background: var(--color-background-soft);
  border-color: var(--color-border);
}

.dropdown.active,
.nav a.active {
  color: #fff;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  border-color: transparent;
  box-shadow: 0 10px 25px rgba(107, 123, 255, 0.35);
}

.theme-btn {
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.page {
  width: 100%;
}

@media (max-width: 768px) {
  .app-header {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .brand {
    justify-content: space-between;
    width: 100%;
  }

  .theme-btn {
    width: 100%;
  }
}
</style>
