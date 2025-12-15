<template>
  <div class="echarts-config">
    <div class="header">
      <h1>ECharts Mock 数据配置</h1>
      <p>配置图表数据的生成参数</p>
    </div>

    <div class="config-panel">
      <div class="config-section">
        <h3>折线图配置</h3>
        <div class="config-item">
          <label>月份数量：</label>
          <input type="number" v-model.number="config.lineChart.months" min="1" max="12" />
        </div>
        <div class="config-item">
          <label>最小值：</label>
          <input type="number" v-model.number="config.lineChart.minValue" />
        </div>
        <div class="config-item">
          <label>最大值：</label>
          <input type="number" v-model.number="config.lineChart.maxValue" />
        </div>
      </div>

      <div class="config-section">
        <h3>柱状图配置</h3>
        <div class="config-item">
          <label>产品数量：</label>
          <input type="number" v-model.number="config.barChart.productCount" min="1" max="20" />
        </div>
        <div class="config-item">
          <label>最小值：</label>
          <input type="number" v-model.number="config.barChart.minValue" />
        </div>
        <div class="config-item">
          <label>最大值：</label>
          <input type="number" v-model.number="config.barChart.maxValue" />
        </div>
      </div>

      <div class="config-section">
        <h3>饼图配置</h3>
        <div class="config-item">
          <label>分类数量：</label>
          <input type="number" v-model.number="config.pieChart.categoryCount" min="1" max="10" />
        </div>
        <div class="config-item">
          <label>最小值：</label>
          <input type="number" v-model.number="config.pieChart.minValue" />
        </div>
        <div class="config-item">
          <label>最大值：</label>
          <input type="number" v-model.number="config.pieChart.maxValue" />
        </div>
      </div>

      <div class="config-section">
        <h3>散点图配置</h3>
        <div class="config-item">
          <label>散点数量：</label>
          <input type="number" v-model.number="config.scatterChart.pointCount" min="10" max="500" />
        </div>
        <div class="config-item">
          <label>X轴最小值：</label>
          <input type="number" v-model.number="config.scatterChart.minX" />
        </div>
        <div class="config-item">
          <label>X轴最大值：</label>
          <input type="number" v-model.number="config.scatterChart.maxX" />
        </div>
        <div class="config-item">
          <label>Y轴最小值：</label>
          <input type="number" v-model.number="config.scatterChart.minY" />
        </div>
        <div class="config-item">
          <label>Y轴最大值：</label>
          <input type="number" v-model.number="config.scatterChart.maxY" />
        </div>
      </div>

      <div class="config-section">
        <h3>雷达图配置</h3>
        <div class="config-item">
          <label>指标数量：</label>
          <input type="number" v-model.number="config.radarChart.indicatorCount" min="3" max="10" />
        </div>
        <div class="config-item">
          <label>最小值：</label>
          <input type="number" v-model.number="config.radarChart.minValue" />
        </div>
        <div class="config-item">
          <label>最大值：</label>
          <input type="number" v-model.number="config.radarChart.maxValue" />
        </div>
      </div>

      <div class="config-section">
        <h3>仪表盘配置</h3>
        <div class="config-item">
          <label>最小值：</label>
          <input type="number" v-model.number="config.gaugeChart.minValue" />
        </div>
        <div class="config-item">
          <label>最大值：</label>
          <input type="number" v-model.number="config.gaugeChart.maxValue" />
        </div>
      </div>

      <div class="actions">
        <button @click="saveConfig" class="btn-primary">保存配置</button>
        <button @click="resetConfig" class="btn-secondary">重置为默认</button>
        <button @click="goToCharts" class="btn-primary">查看图表</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defaultMockConfig, type EChartsMockConfig } from '../config/echartsMock'

const router = useRouter()
const CONFIG_KEY = 'echarts-mock-config'

const config = ref<EChartsMockConfig>({ ...defaultMockConfig })

const loadConfig = () => {
  const saved = localStorage.getItem(CONFIG_KEY)
  if (saved) {
    try {
      config.value = { ...defaultMockConfig, ...JSON.parse(saved) }
    } catch (e) {
      console.error('加载配置失败:', e)
    }
  }
}

const saveConfig = () => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config.value))
  alert('配置已保存！')
}

const resetConfig = () => {
  if (confirm('确定要重置为默认配置吗？')) {
    config.value = { ...defaultMockConfig }
    localStorage.removeItem(CONFIG_KEY)
    alert('已重置为默认配置！')
  }
}

const goToCharts = () => {
  router.push('/echarts')
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.echarts-config {
  width: 100%;
  padding: 0;
}

.header {
  padding: 20px;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  margin-bottom: 20px;
}

.header h1 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: var(--color-heading);
}

.header p {
  margin: 0;
  color: var(--color-text);
  opacity: 0.8;
}

.config-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-card);
}

.config-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.config-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.config-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: var(--color-heading);
}

.config-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.config-item label {
  min-width: 120px;
  color: var(--color-text);
  font-weight: 500;
}

.config-item input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background-soft);
  color: var(--color-heading);
  font-size: 14px;
}

.config-item input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(107, 123, 255, 0.1);
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.actions button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
}

.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(107, 123, 255, 0.3);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-background-soft);
  color: var(--color-heading);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-surface);
  border-color: var(--color-border-hover);
}

@media (max-width: 768px) {
  .config-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .config-item label {
    min-width: auto;
  }

  .config-item input {
    width: 100%;
  }

  .actions {
    flex-direction: column;
  }

  .actions button {
    width: 100%;
  }
}
</style>


