<!-- 柱状图 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, watch } from 'vue'

import { Chart } from '@antv/g2'

// const { t } = useI18n()

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()
// const route = userRoute()
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
  params?: Params
  idName?: string
}

const props = withDefaults(defineProps<Props>(), {
  params: () => {
    return {
      style: {
        width: 400,
        height: 300
      },
      info: {
        data: [],
        chart: {
          title: '每分钟流量',
          position: 'xValue*y1Value',
          padding: [15, 50, 60, 50],
          color: {
            type: 'type',
            color: ['#0090FF', '#21BA45']
          },
          alias: 'MiB',
          scale: {
            max: 400,
            min: -400
          },
          annotation: {
            line: {
              isHas: true
            },
            lineData: {
              traffictop: {
                label: '预警线', // 预警线名
                value: 310, // 预警值
                alias: 'MiB' // 预警线单位
              },
              trafficbottom: {
                label: '预警线', // 预警线名
                value: -300, // 预警值
                alias: 'MiB' // 预警线单位
              }
            },
            regionFilter: {
              isHas: true
            },
            filterData: {
              traffictop: {
                start: 400, // 小于当前值
                end: 310 // 且大于当前值 的范围标红
              },
              trafficbottom: {
                start: -400, // 小于当前值
                end: -300 // 且大于当前值 的范围标红
              }
            }
          },
          slider: false,
          legend: {
            isShow: true,
            position: 'top'
          },
          axisX: {
            label: {
              autoRotate: true,
              rotate: 0.4
            },
            title: null
          }
        }
      }
    }
  },
  idName: 'chartColumn'
})

const chart = ref()
const isLoading = ref(false)
const isShow = ref(false)

const show = async () => {
  isShow.value = true
  isLoading.value = true
  await nextTick()

  const { chart: chartSet, data } = props.params.info

  chart.value = new Chart({
    container: props.idName || 'c', // 指定图表容器 ID
    autoFit: true,
    height: props.params.style.height, // 指定图表高度
    padding: chartSet.padding
  })

  // 载入数据源
  chart.value.data(data)

  // 自定义度量最值
  chart.value.scale(chartSet.position.split('*')[1], props.params.info.chart.scale || { nice: true })

  // 坐标轴显示
  chart.value.axis(chartSet.position.split('*')[0], chartSet?.axisX || {})

  // tooltip
  chart.value.tooltip({
    showTitle: true,
    // title:chartSet.title || '' + (chartSet.alias ? ('（' + chartSet.alias + '）') : ''),
    title: (title: any, datum: any) => datum[chartSet.position.split('*')[0]],
    showCrosshairs: true,
    crosshairs: {
      type: 'xy'
    },
    shared: true
  })

  chart.value.interaction('active-region')
  // 是否展示标注线
  if (chartSet?.annotation?.line?.isHas) {
    const lineData = chartSet.annotation.lineData

    // 考虑到有可能不止一条预警线，所以加入了循环的写法
    for (const key in lineData) {
      chart.value.annotation().line({
        start: ['min', lineData[key].value],
        end: ['max', lineData[key].value],
        offsetX: -20,
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
          offsetY: 0
        }
      })
    }

    // console.log('chart.value.annotation().line: ', chart.value.annotation().line())
  }

  // 是否标红过滤超出数据
  if (chartSet?.annotation?.regionFilter?.isHas) {
    const filterData = chartSet.annotation.filterData
    for (const key in filterData) {
      chart.value.annotation().regionFilter({
        top: true,
        start: ['min', filterData[key].start],
        end: ['max', filterData[key].end],
        // offsetX: 30,
        apply: ['interval'],
        autoAdjust: true,
        adjust: true,
        color: '#ff4d4f'
      })
    }
    // console.log('chart.value.annotation().regionFilter: ', chart.value.annotation().regionFilter)
  }

  // 创建图形语法，绘制柱状图，由 position*前 和 position*后 两个属性决定图形位置，*前 映射至 x 轴，*后 映射至 y 轴
  if (chartSet?.adjust?.length) {
    chart.value
      .interval()
      .position(chartSet.position)
      .color(chartSet.color.type ? chartSet.color.type : '', chartSet.color.color)
      .adjust(chartSet.adjust)
  } else {
    chart.value
      .interval()
      .position(chartSet.position)
      .color(chartSet.color.type ? chartSet.color.type : '', chartSet.color.color)
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

  // 将 dodgePadding 属性设置为 0，解决渲染超出部分只有宽度的一半的问题
  // chart.value.getController('interval').dodgePadding = 0
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
.MyCtColumn {
}
</style>
