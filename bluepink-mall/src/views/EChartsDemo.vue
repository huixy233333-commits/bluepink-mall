<template>
  <div class="echarts-demo">
    <div class="header">
      <h1>ECharts 图表演示</h1>
      <p>展示多种类型的 ECharts 图表（数据由 Faker.js 生成）</p>
      <div class="header-actions">
        <button @click="refreshData" class="refresh-btn">刷新数据</button>
        <button @click="goToConfig" class="config-btn">配置参数</button>
      </div>
    </div>

    <div class="charts-grid">
      <!-- 折线图 -->
      <div class="chart-card">
        <h3>折线图</h3>
        <div ref="lineChartRef" class="chart-container"></div>
      </div>

      <!-- 柱状图 -->
      <div class="chart-card">
        <h3>柱状图</h3>
        <div ref="barChartRef" class="chart-container"></div>
      </div>

      <!-- 饼图 -->
      <div class="chart-card">
        <h3>饼图</h3>
        <div ref="pieChartRef" class="chart-container"></div>
      </div>

      <!-- 散点图 -->
      <div class="chart-card">
        <h3>散点图</h3>
        <div ref="scatterChartRef" class="chart-container"></div>
      </div>

      <!-- 雷达图 -->
      <div class="chart-card">
        <h3>雷达图</h3>
        <div ref="radarChartRef" class="chart-container"></div>
      </div>

      <!-- 仪表盘 -->
      <div class="chart-card">
        <h3>仪表盘</h3>
        <div ref="gaugeChartRef" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import {
  defaultMockConfig,
  type EChartsMockConfig,
  generateLineChartData,
  generateBarChartData,
  generatePieChartData,
  generateScatterChartData,
  generateRadarChartData,
  generateGaugeChartData,
} from '../config/echartsMock'

const router = useRouter()
const CONFIG_KEY = 'echarts-mock-config'

const lineChartRef = ref<HTMLDivElement | null>(null)
const barChartRef = ref<HTMLDivElement | null>(null)
const pieChartRef = ref<HTMLDivElement | null>(null)
const scatterChartRef = ref<HTMLDivElement | null>(null)
const radarChartRef = ref<HTMLDivElement | null>(null)
const gaugeChartRef = ref<HTMLDivElement | null>(null)

let charts: echarts.ECharts[] = []
let mockConfig: EChartsMockConfig = { ...defaultMockConfig }

const loadConfig = () => {
  const saved = localStorage.getItem(CONFIG_KEY)
  if (saved) {
    try {
      mockConfig = { ...defaultMockConfig, ...JSON.parse(saved) }
    } catch (e) {
      console.error('加载配置失败:', e)
    }
  }
}

const initCharts = async () => {
  await nextTick()
  loadConfig()

  // 折线图
  if (lineChartRef.value) {
    const lineChart = echarts.init(lineChartRef.value)
    const lineData = generateLineChartData(mockConfig.lineChart)
    lineChart.setOption({
      title: { text: '月度销售额趋势' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: lineData.labels,
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: '销售额',
          type: 'line',
          data: lineData.data,
          smooth: true,
          itemStyle: { color: '#6b7bff' },
        },
      ],
    })
    charts.push(lineChart)
  }

  // 柱状图
  if (barChartRef.value) {
    const barChart = echarts.init(barChartRef.value)
    const barData = generateBarChartData(mockConfig.barChart)
    barChart.setOption({
      title: { text: '产品销量对比' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: barData.labels,
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: barData.data,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#6b7bff' },
              { offset: 1, color: '#ff76b8' },
            ]),
          },
        },
      ],
    })
    charts.push(barChart)
  }

  // 饼图
  if (pieChartRef.value) {
    const pieChart = echarts.init(pieChartRef.value)
    const pieData = generatePieChartData(mockConfig.pieChart)
    pieChart.setOption({
      title: { text: '市场份额分布' },
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)',
          },
          data: pieData,
        },
      ],
    })
    charts.push(pieChart)
  }

  // 散点图
  if (scatterChartRef.value) {
    const scatterChart = echarts.init(scatterChartRef.value)
    const scatterData = generateScatterChartData(mockConfig.scatterChart)
    scatterChart.setOption({
      title: { text: '数据分布散点图' },
      tooltip: { trigger: 'item' },
      xAxis: { type: 'value', scale: true },
      yAxis: { type: 'value', scale: true },
      series: [
        {
          type: 'scatter',
          data: scatterData,
          symbolSize: 8,
          itemStyle: { color: '#6b7bff' },
        },
      ],
    })
    charts.push(scatterChart)
  }

  // 雷达图
  if (radarChartRef.value) {
    const radarChart = echarts.init(radarChartRef.value)
    const radarData = generateRadarChartData(mockConfig.radarChart)
    radarChart.setOption({
      title: { text: '能力雷达图' },
      radar: {
        indicator: radarData.indicators,
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: radarData.values,
              name: '团队能力',
              areaStyle: {
                color: 'rgba(107, 123, 255, 0.3)',
              },
            },
          ],
        },
      ],
    })
    charts.push(radarChart)
  }

  // 仪表盘
  if (gaugeChartRef.value) {
    const gaugeChart = echarts.init(gaugeChartRef.value)
    const gaugeValue = generateGaugeChartData(mockConfig.gaugeChart)
    gaugeChart.setOption({
      title: { text: '完成度' },
      series: [
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20,
          },
          detail: {
            valueAnimation: true,
            fontSize: 30,
            offsetCenter: [0, '0%'],
          },
          data: [
            {
              value: gaugeValue,
              name: '完成度',
            },
          ],
        },
      ],
    })
    charts.push(gaugeChart)
  }

  // 响应式调整
  window.addEventListener('resize', handleResize)
}

const refreshData = () => {
  charts.forEach((chart) => {
    chart.dispose()
  })
  charts = []
  initCharts()
}

const goToConfig = () => {
  router.push('/echarts-config')
}

const handleResize = () => {
  charts.forEach((chart) => {
    chart.resize()
  })
}

onMounted(() => {
  initCharts()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  charts.forEach((chart) => {
    chart.dispose()
  })
  charts = []
})
</script>

<style scoped>
.echarts-demo {
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
  margin: 0 0 12px 0;
  color: var(--color-text);
  opacity: 0.8;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.header-actions button {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.config-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-border-hover);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-card);
}

.chart-card h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: var(--color-heading);
}

.chart-container {
  width: 100%;
  height: 350px;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    height: 300px;
  }
}
</style>


