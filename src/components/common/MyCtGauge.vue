<!-- 仪表盘 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue'

import { Chart, registerShape } from '@antv/g2'

// 自定义Shape 部分
registerShape('point', 'pointer', {
  draw (cfg, container) {
    const group = container.addGroup()
    const center = this.parsePoint({ x: 0, y: 0 }) // 获取极坐标系下画布中心点

    return group
  }
})
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
        data: [{ value: 5.6 }],
        chart: {
          annotation: {
            style: {
              stroke: 'l(0) 0:#FC5531 0.7:#F2C037 1:#21BA45'
            }
          }
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
    padding: [0, 0, 10, 0]
  })

  chart.value.scale('value', {
    min: 0,
    max: 9,
    tickInterval: 1
  })
  chart.value.coordinate('polar', {
    startAngle: (-9 / 8) * Math.PI,
    endAngle: (1 / 8) * Math.PI,
    radius: 0.75
  })

  chart.value.axis('1', false)
  chart.value.axis('value', {
    line: null,
    label: {
      style: {
        fontSize: 0
      }
    },
    grid: null
  })
  chart.value.legend(false)
  chart.value
    .point()
    .position('value*1')
    .shape('pointer')
    .color('#1890FF')
    .style({ radius: [20, 20, 0, 0] })
    .animate({
      appear: {
        animation: 'fade-in'
      }
    })

  // 绘制仪表盘背景
  chart.value.annotation().arc({
    top: false,
    start: [0, 1],
    end: [9, 1],
    style: {
    // 底灰色
      stroke: '#eaf5f6',
      lineWidth: 15,
      lineDash: null,
      lineCap: 'round'
    }
  })

  // 绘制指标
  chart.value.annotation().arc({
    start: [0, 1],
    end: [props.params.info.data[0].value, 1],
    style: {
      stroke: props.params.info.chart.annotation.style.stroke, // 环形渐变样式
      lineWidth: 15,
      lineDash: null,
      lineCap: 'round' // 圆角
    }
  })
  // 绘制指标数字
  chart.value.annotation().text({
    position: ['50%', '90%'],
    content: props.params.info.title,
    style: {
      fontSize: 14,
      fill: '#545454',
      textAlign: 'center'
    }
  })
  chart.value.annotation().text({
    position: ['50%', '55%'],
    content: `${props.params.info.data[0].value * 10}%`,
    style: {
      fontSize: 36,
      fill: '#223b53',
      textAlign: 'center'
    },
    offsetY: 15
  })

  chart.value.data(props.params.info.data)
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
