<template>
  <div class="map-container">
    <div class="map-header">
      <h1>Three.js 3D 演示</h1>
      <p>基于 Three.js 的 WebGL 三维场景展示</p>
    </div>
    <div ref="threeContainerRef" class="three-view"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const threeContainerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null

onMounted(() => {
  if (!threeContainerRef.value) return

  const width = threeContainerRef.value.clientWidth
  const height = threeContainerRef.value.clientHeight

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1a1a)

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 5, 10)
  camera.lookAt(0, 0, 0)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  threeContainerRef.value.appendChild(renderer.domElement)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  // 添加地面
  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true
  scene.add(plane)

  // 添加立方体
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x6b7bff })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(0, 1, 0)
  cube.castShadow = true
  scene.add(cube)

  // 添加球体
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b7b })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(-3, 1, 0)
  sphere.castShadow = true
  scene.add(sphere)

  // 添加环形体
  const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100)
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x6bff7b })
  const torus = new THREE.Mesh(torusGeometry, torusMaterial)
  torus.position.set(3, 1, 0)
  torus.castShadow = true
  scene.add(torus)

  // 动画循环
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (cube) cube.rotation.x += 0.01
    if (cube) cube.rotation.y += 0.01
    if (sphere) sphere.rotation.y += 0.02
    if (torus) torus.rotation.x += 0.01

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

  // 响应式调整
  const handleResize = () => {
    if (!threeContainerRef.value || !camera || !renderer) return
    const width = threeContainerRef.value.clientWidth
    const height = threeContainerRef.value.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
    if (threeContainerRef.value && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
  window.removeEventListener('resize', () => {})
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

.three-view {
  flex: 1;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  background: #1a1a1a;
}
</style>

