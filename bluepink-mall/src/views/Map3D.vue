<template>
  <div class="map-container">
    <div class="map-header">
      <h1>3D 地图演示</h1>
      <p>基于 ArcGIS SceneView 的三维地图展示，包含行政底图和文字标注</p>
    </div>
    <div ref="sceneViewRef" class="scene-view"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import TextSymbol from '@arcgis/core/symbols/TextSymbol'

const sceneViewRef = ref<HTMLDivElement | null>(null)
let sceneView: SceneView | null = null

onMounted(async () => {
  // 等待 DOM 完全渲染
  await nextTick()

  if (!sceneViewRef.value) {
    console.error('地图容器未找到')
    return
  }

  try {
    // 使用行政底图（包含街道、行政边界和标注）
    const map = new Map({
      basemap: 'arcgis-streets', // 街道底图，包含行政边界和标注
      ground: 'world-elevation', // 3D 地形高程
    })

    sceneView = new SceneView({
      container: sceneViewRef.value,
      map: map,
      center: [116.3974, 39.9093], // 北京天安门
      zoom: 13,
    })

    // 设置相机位置
    sceneView.goTo({
      position: {
        longitude: 116.3974,
        latitude: 39.9093,
        z: 2000,
      },
      tilt: 75,
    })

    // 等待地图视图加载完成后再添加标注图层
    sceneView.when(async () => {
      console.log('3D 地图加载完成')

      // 创建图形图层用于显示标注
      const graphicsLayer = new GraphicsLayer({
        title: '行政标注',
      })

      // 添加一些重要地点的标注
      const labels = [
        { name: '天安门', lon: 116.3974, lat: 39.9093 },
        { name: '故宫', lon: 116.3972, lat: 39.9163 },
        { name: '天坛', lon: 116.4074, lat: 39.8823 },
        { name: '王府井', lon: 116.4179, lat: 39.9097 },
        { name: '前门', lon: 116.395, lat: 39.899 },
        { name: '景山公园', lon: 116.3967, lat: 39.9283 },
        { name: '北海公园', lon: 116.3889, lat: 39.9256 },
      ]

      labels.forEach((label) => {
        const point = new Point({
          longitude: label.lon,
          latitude: label.lat,
          z: 50, // 3D 场景中设置高度
        })

        // 创建文字标注符号
        const textSymbol = new TextSymbol({
          text: label.name,
          color: '#1a1a1a',
          font: {
            size: 13,
            weight: 'bold',
            family: 'Microsoft YaHei, Arial, sans-serif',
          },
          haloColor: '#ffffff',
          haloSize: 2,
          yoffset: -10, // 向上偏移，避免遮挡点
        })

        const graphic = new Graphic({
          geometry: point,
          symbol: textSymbol,
          attributes: {
            NAME: label.name,
          },
        })

        graphicsLayer.add(graphic)
      })

      // 将图层添加到地图
      map.add(graphicsLayer)
    }).catch((error: Error) => {
      console.error('地图加载失败:', error)
    })
  } catch (error: unknown) {
    console.error('创建地图时出错:', error)
  }
})

onBeforeUnmount(() => {
  if (sceneView) {
    sceneView.destroy()
    sceneView = null
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.map-header {
  padding: 20px;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.map-header h1 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: var(--color-heading);
}

.map-header p {
  margin: 0;
  color: var(--color-text);
  opacity: 0.8;
}

.scene-view {
  flex: 1;
  width: 100%;
  min-height: 500px;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}
</style>

