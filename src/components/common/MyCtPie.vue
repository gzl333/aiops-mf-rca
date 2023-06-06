<!-- 饼图 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue'

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
        data: [
          { item: '事例一', count: 40, percent: 0.4 },
          { item: '事例二', count: 21, percent: 0.21 },
          { item: '事例三', count: 17, percent: 0.17 },
          { item: '事例四', count: 13, percent: 0.13 },
          { item: '事例五', count: 9, percent: 0.09 }
        ],
        chart: {
          padding: [10, 0, 0, 0],
          position: 'percent',
          color: 'item',
          tooltip: 'item*percent'
        }
      }
    }
  },
  idName: 'c'
})

const chart = ref()

const isShow = ref(false)

const show = async () => {
  isShow.value = true
  await nextTick()

  chart.value = new Chart({
    container: props.idName || 'c', // 指定图表容器 ID
    autoFit: true,
    height: props.params.style.height, // 指定图表高度
    padding: props.params.info.chart.padding
  })
  chart.value.data(props.params.info.data)

  chart.value.coordinate('theta', {
    radius: 0.85
  })

  chart.value.scale('percent', {
    formatter: (val) => {
      val = val * 100 + '%'
      return val
    }
  })
  chart.value.tooltip({
    showTitle: false,
    showMarkers: false
  })
  chart.value.axis(false) // 关闭坐标轴
  const interval = chart.value
    .interval()
    .adjust('stack')
    .position(props.params.info.chart.position)
    .color(props.params.info.chart.color.type ? props.params.info.chart.color.type : '', props.params.info.chart.color.color)
    .label(props.params.info.chart.position, {
      offset: -40,
      style: {
        textAlign: 'center',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
        fill: '#fff'
      }
    })
    .tooltip(props.params.info.chart.tooltip, (item, percent) => {
      percent = percent * 100 + '%'
      return {
        name: item,
        value: percent
      }
    })
    .style({
      lineWidth: 1,
      stroke: '#fff'
    })
  chart.value.interaction('element-single-selected')
  chart.value.render()

  // 默认选择
  interval.elements[0].setState('selected', true)
}

const hidden = () => {
  isShow.value = false
}

defineExpose({ show, hidden })
</script>

<template>
  <div :id="idName" isShow></div>
</template>

<style lang="scss" scoped>
.MyCtGuge {
}
</style>
