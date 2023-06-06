<!-- 折线图 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, watch } from 'vue'
import { Chart } from '@antv/g2'
// import $bus from 'src/hooks/bus'
import { cpuUsageData } from 'components/rca/monitorUnit/chartTestData/host'
interface Params {
  style: {
    width?: number
    height?: number
    [propName: string]: any
  },
  info: {
    data: any
    [propName: string]: any
  },
  [propName: string]: any
}

interface Props {
  params?: any
  idName?: string
}

const props = withDefaults(defineProps<Props>(), {
  params: () => {
    return {}
  },
  idName: 'chartLine'
})
const chart = ref()
const isShow = ref(false)
const isLoading = ref(false)

const show = async () => {
  isShow.value = true
  isLoading.value = true
  await nextTick()

  const { chart: chartSet, data } = props.params.info

  chart.value = new Chart({
    container: props.idName || 'chartLine',
    autoFit: true,
    height: props.params.style.height,
    padding: chartSet.padding
  })
  // 纵坐标轴显示
  chart.value.scale(chartSet.position.split('*')[1], chartSet.scale || { nice: true })
  // 坐标轴显示
  chart.value.axis(chartSet.position.split('*')[0], chartSet?.axisX || {})
  chart.value.data(data)
  // tooltip
  chart.value.tooltip({
    // title: chartSet.title || '' + (chartSet.alias ? ('（' + chartSet.alias + '）') : ''),
    // // itemTpl: '<li>{label}：{value}</li>',
    // showCrosshairs: true,
    // shared: true
    showTitle: true,
    // title:chartSet.title || '' + (chartSet.alias ? ('（' + chartSet.alias + '）') : ''),
    title: (title: any, datum: any) => datum[chartSet.position.split('*')[0]],
    showCrosshairs: true,
    crosshairs: {
      type: 'xy'
    },
    shared: true
  })

  chartSet?.color?.type
    ? chart.value.line()
      .position(chartSet.position)
      .color(chartSet.color.type, chartSet.color.color)
      .shape(chartSet.shape || 'line')
      // .tooltip(chartSet.position, (label, value) => {
      //   return { label, value: `${value}` }
      // })
    : chart.value.line()
      .position(chartSet.position)
      .color(chartSet.color)
      .shape(chartSet.shape || 'line')
      // .tooltip(chartSet.position, (label, value) => {
      //   return { label, value: `${value}` }
      // })

  // 是否启用面积图
  if (chartSet.area) {
    chartSet.color.type
      ? chart.value.area()
        .adjust(chartSet.adjust || 'stack')
        .position(chartSet.position)
        .color(chartSet.color.type, chartSet.color.color)
        .shape(chartSet.shape || 'area') // shape: area（一般区域图） smooth（平滑区域图） line（仅用线包围起区域图的范围，而不使用颜色填充） smooth-line（平滑线包围器区域图的范围，不使用颜色填充）
      : chart.value.area()
        .adjust(chartSet.adjust || 'stack')
        .position(chartSet.position)
        .color(chartSet.color)
        .shape(chartSet.shape || 'area')

    // chart.value.area()
    //   .position(chartSet.position)
    //   .color(chartSet?.color?.type ? (chartSet.color.type, chartSet.color.color) : chartSet.color.color)
    //   .shape(chartSet.shape || 'area') // shape: area（一般区域图） smooth（平滑区域图） line（仅用线包围起区域图的范围，而不使用颜色填充） smooth-line（平滑线包围器区域图的范围，不使用颜色填充）
  }

  // 是否展示标注线
  if (chartSet?.annotation?.line?.isHas) {
    const lineData = chartSet.annotation.lineData

    // 考虑到有可能不止一条预警线，所以加入了循环的写法
    for (const key in lineData) {
      chart.value.annotation().line({
        start: ['min', lineData[key].value],
        end: ['max', lineData[key].value],
        style: {
          stroke: '#ff4d4f',
          lineWidth: 1,
          lineDash: [3, 3]
        },
        text: {
          position: 'end',
          style: {
            fill: '#8c8c8c',
            fontSize: 12,
            fontWeight: 'normal'
          },
          content: `${lineData[key].label}${lineData[key].value}${lineData[key].alias}`,
          offsetY: -5
        }
      })
    }
  }

  // 是否标红过滤超出数据
  if (chartSet?.annotation?.regionFilter?.isHas) {
    const filterData = chartSet.annotation.filterData
    for (const key in filterData) {
      chart.value.annotation().regionFilter({
        top: true,
        start: ['min', filterData[key].start],
        end: ['max', filterData[key].end],
        color: '#ff4d4f'
      })
    }
  }

  // 是否展示图例
  if (chartSet?.legend?.isShow || chartSet?.legend) {
    chart.value.legend({ position: chartSet?.legend?.position || 'top' })
  } else {
    chart.value.legend(false)
  }

  // 是否展示滑块
  if (chartSet.slider) {
    chart.value.option('slider', {
      trendCfg: {
        isArea: false
      }
    })
  }

  isLoading.value = false
  await nextTick()
  chart.value.render()
}
const hidden = () => {
  isShow.value = false
}

// 数据修改后更新chart
const upDateChart = async () => {
  chart.value.clear()
  hidden()
  await nextTick()
  show()
}
watch(props, () => {
  upDateChart()
}, { deep: true })
// $bus.on('refreshChart', (value: boolean) => {
//   if (value) {
//     upDateChart()
//   }
// })
defineExpose({ show, hidden, upDateChart })
</script>

<template>
  <div>
    <!-- 加载中展示 -->
    <div class="row justify-center items-center bd-md-radius-aiops-border" v-if="isLoading" :style="{ height: `${params.style.height}px` }">
      <div class="column items-center">
        <q-spinner-bars
          color="aiops-primary"
          size="2em"
        />
        <p class="q-mt-sm">加载中</p>
      </div>
    </div>

    <!-- chart图 -->
    <div :id="idName" v-if="isShow"></div>
  </div>
</template>

<style lang="scss" scoped>
.MyCtLine {
}
</style>
