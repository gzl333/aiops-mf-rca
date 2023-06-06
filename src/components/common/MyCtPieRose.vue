<!-- 仪表盘 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue'

import { Chart, getTheme } from '@antv/g2'

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
          { year: '2001', population: 41.8 },
          { year: '2002', population: 38 },
          { year: '2003', population: 33.7 },
          { year: '2004', population: 30.7 },
          { year: '2005', population: 25.8 },
          { year: '2006', population: 31.7 },
          { year: '2007', population: 33 }
        ],
        chart: {
          padding: [10, 0, 0, 0],
          position: 'year*population',
          color: 'year'
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

  chart.value.coordinate('polar', {
    innerRadius: 0.6
  })
  chart.value.legend('year', {
    position: 'right'
  })
  chart.value.axis(false)
  chart.value.tooltip({
    showMarkers: false
  })
  chart.value.interaction('element-highlight')
  chart.value
    .interval()
    .position(props.params.info.chart.position)
    .color(props.params.info.chart.color.type ? props.params.info.chart.color.type : '', props.params.info.chart.color.color)
    .style({
      lineWidth: 1,
      stroke: '#fff'
    })
  chart.value.render()
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
