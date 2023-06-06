<!-- radial line -->
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
        data: [],
        chart: {
          padding: [10, 0, 0, 0]
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
    innerRadius: 0.3,
    endAngle: Math.PI
  })

  chart.value.axis('term', {
    tickLine: null,
    grid: null,
    line: null
  })

  chart.value
    .interval()
    .position('term*count')
    .shape('line')
    .style({
      lineAppendWidth: 10
    }) // 线状柱状图

  chart.value
    .point()
    .position('term*count')
    .shape('circle')

  chart.value.annotation().text({
    position: ['50%', '50%'],
    content: props.params.info.title,
    style: {
      textAlign: 'center',
      fontSize: 14
    }
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
.MyCtRadialLine {
}
</style>
