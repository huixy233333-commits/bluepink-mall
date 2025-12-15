import { faker } from '@faker-js/faker'

/**
 * ECharts Mock 数据配置
 */
export interface EChartsMockConfig {
  // 折线图配置
  lineChart: {
    months: number // 月份数量
    minValue: number // 最小值
    maxValue: number // 最大值
  }
  // 柱状图配置
  barChart: {
    productCount: number // 产品数量
    minValue: number
    maxValue: number
  }
  // 饼图配置
  pieChart: {
    categoryCount: number // 分类数量
    minValue: number
    maxValue: number
  }
  // 散点图配置
  scatterChart: {
    pointCount: number // 散点数量
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
  // 雷达图配置
  radarChart: {
    indicatorCount: number // 指标数量
    minValue: number
    maxValue: number
  }
  // 仪表盘配置
  gaugeChart: {
    minValue: number
    maxValue: number
  }
}

/**
 * 默认配置
 */
export const defaultMockConfig: EChartsMockConfig = {
  lineChart: {
    months: 12,
    minValue: 50,
    maxValue: 500,
  },
  barChart: {
    productCount: 6,
    minValue: 100,
    maxValue: 1000,
  },
  pieChart: {
    categoryCount: 5,
    minValue: 200,
    maxValue: 1500,
  },
  scatterChart: {
    pointCount: 100,
    minX: 0,
    maxX: 100,
    minY: 0,
    maxY: 100,
  },
  radarChart: {
    indicatorCount: 6,
    minValue: 60,
    maxValue: 100,
  },
  gaugeChart: {
    minValue: 0,
    maxValue: 100,
  },
}

/**
 * 生成折线图数据
 */
export function generateLineChartData(config: EChartsMockConfig['lineChart']) {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const data = []
  const labels = []

  for (let i = 0; i < config.months; i++) {
    labels.push(months[i] || `${i + 1}月`)
    data.push(faker.number.int({ min: config.minValue, max: config.maxValue }))
  }

  return { labels, data }
}

/**
 * 生成柱状图数据
 */
export function generateBarChartData(config: EChartsMockConfig['barChart']) {
  const labels = []
  const data = []

  for (let i = 0; i < config.productCount; i++) {
    labels.push(faker.commerce.productName())
    data.push(faker.number.int({ min: config.minValue, max: config.maxValue }))
  }

  return { labels, data }
}

/**
 * 生成饼图数据
 */
export function generatePieChartData(config: EChartsMockConfig['pieChart']) {
  const data = []

  for (let i = 0; i < config.categoryCount; i++) {
    data.push({
      value: faker.number.int({ min: config.minValue, max: config.maxValue }),
      name: faker.commerce.department(),
    })
  }

  return data
}

/**
 * 生成散点图数据
 */
export function generateScatterChartData(config: EChartsMockConfig['scatterChart']) {
  const data: number[][] = []

  for (let i = 0; i < config.pointCount; i++) {
    data.push([
      faker.number.float({ min: config.minX, max: config.maxX, fractionDigits: 2 }),
      faker.number.float({ min: config.minY, max: config.maxY, fractionDigits: 2 }),
    ])
  }

  return data
}

/**
 * 生成雷达图数据
 */
export function generateRadarChartData(config: EChartsMockConfig['radarChart']) {
  const indicators = []
  const values = []

  const categories = ['销售', '管理', '信息技术', '客服', '研发', '市场', '运营', '财务', '人事', '采购']

  for (let i = 0; i < config.indicatorCount; i++) {
    indicators.push({
      name: categories[i] || faker.company.buzzNoun(),
      max: 100,
    })
    values.push(faker.number.int({ min: config.minValue, max: config.maxValue }))
  }

  return { indicators, values }
}

/**
 * 生成仪表盘数据
 */
export function generateGaugeChartData(config: EChartsMockConfig['gaugeChart']) {
  return faker.number.int({ min: config.minValue, max: config.maxValue })
}


