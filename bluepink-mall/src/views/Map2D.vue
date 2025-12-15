<template>
  <div ref="mapViewRef" class="map-view"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

const mapViewRef = ref<HTMLDivElement | null>(null)
let mapView: MapView | null = null

onMounted(async () => {
  await nextTick()

  if (!mapViewRef.value) {
    console.error('地图容器未找到')
    return
  }

  try {
    const map = new Map({
      basemap: 'streets-vector', // 使用街道底图
    })

    mapView = new MapView({
      container: mapViewRef.value,
      map: map,
      center: [-118.2437, 34.0522], // 洛杉矶
      zoom: 12,
    })

    mapView.when(
      () => {
        console.log('2D 地图加载完成')
      },
      (error: Error) => {
        console.error('地图加载失败:', error)
      }
    )
  } catch (error: unknown) {
    console.error('创建地图时出错:', error)
  }
})

onBeforeUnmount(() => {
  if (mapView) {
    mapView.destroy()
    mapView = null
  }
})
</script>

<style scoped>
.map-view {
  width: 100%;
  height: calc(100vh - 120px);
  padding: 0;
  margin: 0;
}
</style>
