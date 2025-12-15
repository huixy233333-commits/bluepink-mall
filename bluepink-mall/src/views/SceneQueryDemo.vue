<template>
  <div class="page">
    <div class="panels">
      <div class="panel">
        <h2>3D 场景查询示例</h2>
        <p>基于官方示例改写，支持绘制几何 + 缓冲后统计并高亮建筑。</p>

        <div class="actions">
          <button
            v-for="tool in drawTools"
            :key="tool.value"
            :class="{ active: activeTool === tool.value }"
            type="button"
            @click="startDraw(tool.value)"
          >
            {{ tool.label }}
          </button>
          <button type="button" class="ghost" @click="clearGeometry">清除</button>
        </div>

        <div class="slider">
          <label>缓冲距离：{{ bufferSize }} m</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            v-model.number="bufferSize"
            @input="runQuery"
          />
        </div>

        <div class="count">选中建筑：{{ selectedCount }}</div>
      </div>

      <div class="panel charts">
        <div class="chart-block">
          <h3>建造年份</h3>
          <canvas ref="yearChartRef" width="320" height="240"></canvas>
        </div>
        <div class="chart-block">
          <h3>建筑材料</h3>
          <canvas ref="materialChartRef" width="320" height="240"></canvas>
        </div>
      </div>
    </div>

    <div ref="viewDiv" class="view"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine'
import * as promiseUtils from '@arcgis/core/core/promiseUtils'
import type { SceneLayer, SceneLayerView } from '@arcgis/core/layers/SceneLayer'
import Chart from 'chart.js/auto'

const viewDiv = ref<HTMLDivElement | null>(null)
const yearChartRef = ref<HTMLCanvasElement | null>(null)
const materialChartRef = ref<HTMLCanvasElement | null>(null)

const drawTools = [
  { label: '点', value: 'point' },
  { label: '线', value: 'polyline' },
  { label: '面', value: 'polygon' },
]

const bufferSize = ref(0)
const selectedCount = ref(0)
const activeTool = ref<string | null>(null)

let view: SceneView | null = null
let sceneLayer: SceneLayer | null = null
let sceneLayerView: SceneLayerView | null = null
let sketchLayer: GraphicsLayer | null = null
let bufferLayer: GraphicsLayer | null = null
let sketchVM: SketchViewModel | null = null
let highlightHandle: __esri.Handle | null = null
let yearChart: Chart | null = null
let materialChart: Chart | null = null

const debouncedRunQuery = promiseUtils.debounce(async () => {
  if (!sketchVM?.sketchGeometry || !sceneLayerView) return

  // 更新缓冲区
  updateBufferGraphic(bufferSize.value)

  const query = sceneLayerView.createQuery()
  query.geometry = sketchVM.sketchGeometry
  query.distance = bufferSize.value

  const [ids, statsResult] = await Promise.all([
    sceneLayerView.queryObjectIds(query),
    sceneLayerView.queryFeatures({
      ...query,
      outStatistics: [
        {
          onStatisticField: "CASE WHEN buildingMaterial = 'concrete or lightweight concrete' THEN 1 ELSE 0 END",
          outStatisticFieldName: 'material_concrete',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN buildingMaterial = 'brick' THEN 1 ELSE 0 END",
          outStatisticFieldName: 'material_brick',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN buildingMaterial = 'wood' THEN 1 ELSE 0 END",
          outStatisticFieldName: 'material_wood',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN buildingMaterial = 'steel' THEN 1 ELSE 0 END",
          outStatisticFieldName: 'material_steel',
          statisticType: 'sum',
        },
        {
          onStatisticField:
            "CASE WHEN buildingMaterial IN ('concrete or lightweight concrete', 'brick', 'wood', 'steel') THEN 0 ELSE 1 END",
          outStatisticFieldName: 'material_other',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN (yearCompleted >= '1850' AND yearCompleted <= '1899') THEN 1 ELSE 0 END",
          outStatisticFieldName: 'year_1850',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN (yearCompleted >= '1900' AND yearCompleted <= '1924') THEN 1 ELSE 0 END",
          outStatisticFieldName: 'year_1900',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN (yearCompleted >= '1925' AND yearCompleted <= '1949') THEN 1 ELSE 0 END",
          outStatisticFieldName: 'year_1925',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN (yearCompleted >= '1950' AND yearCompleted <= '1974') THEN 1 ELSE 0 END",
          outStatisticFieldName: 'year_1950',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN (yearCompleted >= '1975' AND yearCompleted <= '1999') THEN 1 ELSE 0 END",
          outStatisticFieldName: 'year_1975',
          statisticType: 'sum',
        },
        {
          onStatisticField: "CASE WHEN (yearCompleted >= '2000' AND yearCompleted <= '2015') THEN 1 ELSE 0 END",
          outStatisticFieldName: 'year_2000',
          statisticType: 'sum',
        },
      ],
    }),
  ])

  highlightBuildings(ids)
  updateCharts(statsResult.features[0]?.attributes ?? {})
})

const runQuery = () => {
  debouncedRunQuery().catch((error) => {
    if (error?.name === 'AbortError') return
    console.error(error)
  })
}

const updateCharts = (attrs: Record<string, number>) => {
  const yearData = [
    attrs.year_1850 ?? 0,
    attrs.year_1900 ?? 0,
    attrs.year_1925 ?? 0,
    attrs.year_1950 ?? 0,
    attrs.year_1975 ?? 0,
    attrs.year_2000 ?? 0,
  ]

  const materialData = [
    attrs.material_concrete ?? 0,
    attrs.material_brick ?? 0,
    attrs.material_wood ?? 0,
    attrs.material_steel ?? 0,
    attrs.material_other ?? 0,
  ]

  yearChart?.data.datasets[0].data.splice(0, yearData.length, ...yearData)
  yearChart?.update()

  materialChart?.data.datasets[0].data.splice(0, materialData.length, ...materialData)
  materialChart?.update()

  selectedCount.value = materialData.reduce((sum, v) => sum + v, 0)
}

const updateBufferGraphic = (buffer: number) => {
  if (!bufferLayer || !sketchVM?.sketchGeometry) return

  if (buffer > 0) {
    const bufferGeom = geometryEngine.geodesicBuffer(sketchVM.sketchGeometry, buffer, 'meters')
    if (bufferLayer.graphics.length === 0) {
      bufferLayer.add(
        new Graphic({
          geometry: bufferGeom,
          symbol: sketchVM.polygonSymbol,
        })
      )
    } else {
      bufferLayer.graphics.getItemAt(0).geometry = bufferGeom
    }
  } else {
    bufferLayer.removeAll()
  }
}

const clearHighlighting = () => {
  highlightHandle?.remove()
  highlightHandle = null
}

const highlightBuildings = (ids: number[]) => {
  clearHighlighting()
  if (!sceneLayerView || !ids?.length) {
    selectedCount.value = 0
    return
  }
  selectedCount.value = ids.length
  highlightHandle = sceneLayerView.highlight(ids)
}

const clearGeometry = () => {
  sketchVM?.cancel()
  sketchLayer?.removeAll()
  bufferLayer?.removeAll()
  clearHighlighting()
  selectedCount.value = 0
  updateCharts({})
}

const startDraw = (tool: 'point' | 'polyline' | 'polygon') => {
  activeTool.value = tool
  clearGeometry()
  sketchVM?.create(tool)
}

const initCharts = () => {
  if (yearChartRef.value) {
    yearChart = new Chart(yearChartRef.value.getContext('2d') as CanvasRenderingContext2D, {
      type: 'bar',
      data: {
        labels: ['1850-1899', '1900-1924', '1925-1949', '1950-1974', '1975-1999', '2000-2015'],
        datasets: [
          {
            label: '建造年份',
            backgroundColor: '#149dcf',
            data: [0, 0, 0, 0, 0, 0],
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: false,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, title: { display: true, text: '建造年份' } },
        scales: {
          x: { stacked: true, ticks: { precision: 0, beginAtZero: true } },
          y: { stacked: true },
        },
      },
    })
  }

  if (materialChartRef.value) {
    materialChart = new Chart(materialChartRef.value.getContext('2d') as CanvasRenderingContext2D, {
      type: 'doughnut',
      data: {
        labels: ['Concrete', 'Brick', 'Wood', 'Steel', 'Other'],
        datasets: [
          {
            backgroundColor: ['#FD7F6F', '#7EB0D5', '#B2E061', '#BD7EBE', '#FFB55A'],
            borderWidth: 0,
            data: [0, 0, 0, 0, 0],
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        cutout: '35%',
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: '建筑材料' },
        },
      },
    })
  }
}

onMounted(async () => {
  if (!viewDiv.value) return

  initCharts()

  const webscene = new WebScene({
    portalItem: { id: 'fb5948b2bb76439792786000b942e5b7' },
  })

  view = new SceneView({
    container: viewDiv.value,
    map: webscene,
  })

  sketchLayer = new GraphicsLayer()
  bufferLayer = new GraphicsLayer()
  webscene.addMany([bufferLayer, sketchLayer])

  await view.when()

  sceneLayer = webscene.layers.find((layer) => layer.title === 'Helsinki textured buildings') as SceneLayer
  sceneLayerView = await view.whenLayerView(sceneLayer)
  sceneLayer.outFields = ['buildingMaterial', 'yearCompleted']

  sketchVM = new SketchViewModel({
    layer: sketchLayer,
    view,
    defaultUpdateOptions: { tool: 'reshape', toggleToolOnClick: false },
    defaultCreateOptions: { hasZ: false },
  })

  sketchVM.on('create', (event) => {
    if (event.state === 'complete') {
      runQuery()
    }
  })

  sketchVM.on('update', (event) => {
    if (event.state === 'complete') {
      runQuery()
    }
  })
})

onBeforeUnmount(() => {
  debouncedRunQuery.cancel?.()
  highlightHandle?.remove()
  sketchVM?.destroy()
  sceneLayerView?.destroy()
  view?.destroy()
  yearChart?.destroy()
  materialChart?.destroy()
})
</script>

<style scoped>
.page {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 16px;
  height: calc(100vh - 120px);
}

.panels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel {
  padding: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel p {
  margin: 0;
  color: var(--color-text);
  opacity: 0.85;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.actions button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  cursor: pointer;
  font-weight: 600;
}

.actions button.active {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  color: #fff;
  border: none;
}

.actions button.ghost {
  background: var(--color-surface-muted);
}

.slider label {
  display: block;
  margin-bottom: 6px;
  color: var(--color-text);
}

.slider input {
  width: 100%;
}

.count {
  font-weight: 700;
  color: var(--color-heading);
}

.charts {
  display: grid;
  grid-template-columns: 1fr;
}

.chart-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.view {
  width: 100%;
  height: calc(100vh - 120px);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

@media (max-width: 1100px) {
  .page {
    grid-template-columns: 1fr;
    height: auto;
  }

  .view {
    height: 70vh;
  }
}
</style>

