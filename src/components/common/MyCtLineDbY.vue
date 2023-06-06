<!-- 折线图 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue'
import { Chart } from '@antv/g2'

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
          position: '',
          padding: [15, 50, 20, 30],
          shape: '',
          color: '',
          alias: ['Mb/s', 'kb/s'],
          area: false,
          annotation: {
            line: {
              isHas: false // 关闭标注线
            },
            regionFilter: {
              isHas: false // 关闭过滤
            }
          },
          legend: false // 关闭图例
        }
      }
    }
  },
  idName: 'chartLine'
})

const chart = ref()
const isShow = ref(false)

const show = async () => {
  isShow.value = true
  await nextTick()

  const { chart: chartSet, data } = props.params.info

  chart.value = new Chart({
    container: props.idName,
    autoFit: true,
    height: props.params.style.height,
    padding: chartSet.padding
  })
  chart.value.data(data)

  chart.value.scale({
    time: { range: [0, 1] },
    flowValue: {
      nice: true
    },
    packetValue: {
      nice: true
    }
  })

  chart.value.axis('flowValue', {
    // title: {
    //   text: '流量'
    // },
    label: {
      formatter: text => {
        return text + props.params.info.chart.alias[0]
      }
    }
  })

  chart.value.axis('packetValue', {
    label: {
      formatter: text => {
        return text + props.params.info.chart.alias[1]
      }
    }
  })

  chart.value.legend({
    maxHeight: 10
  })

  // tooltip
  chart.value.tooltip({
    showCrosshairs: true,
    shared: true
  })

  if (props.params.info.chart.shape) {
    chart.value.line().position('time*flowValue').color('flow').shape(props.params.info.chart.shape)
    chart.value.line().position('time*packetValue').color('packet', ['#facc14', '#d62728']).shape(props.params.info.chart.shape)
  } else {
    chart.value.line().position('time*flowValue').color('flow')
    chart.value.line().position('time*packetValue').color('packet', ['#facc14', '#d62728'])
  }

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
</style>
