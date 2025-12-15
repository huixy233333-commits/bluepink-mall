import esriConfig from '@arcgis/core/config'

/**
 * ArcGIS 配置
 * 
 * API Key 配置说明：
 * 1. 在项目根目录创建 .env 文件
 * 2. 添加：VITE_ARCGIS_API_KEY=你的有效API密钥
 * 3. 获取 API Key：https://developers.arcgis.com/
 * 
 * 注意：如果没有配置有效的 API Key，地图可能无法正常加载
 */
const ARCGIS_API_KEY = import.meta.env.VITE_ARCGIS_API_KEY

/**
 * 初始化 ArcGIS 配置
 */
export function initArcGISConfig() {
  if (ARCGIS_API_KEY) {
    esriConfig.apiKey = ARCGIS_API_KEY
    console.log('ArcGIS API Key 已配置')
  } else {
    console.warn(
      '⚠️ ArcGIS API Key 未配置！\n' +
      '请在项目根目录创建 .env 文件，并添加：\n' +
      'VITE_ARCGIS_API_KEY=你的API密钥\n' +
      '获取 API Key：https://developers.arcgis.com/'
    )
  }
}

// 自动初始化
initArcGISConfig()

