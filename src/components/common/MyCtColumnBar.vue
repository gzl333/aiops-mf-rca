<!-- 柱状横向 -->
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
          { type: '汽车', value: 34 },
          { type: '建材家居', value: 85 },
          { type: '住宿旅游', value: 103 },
          { type: '交通运输与仓储邮政', value: 142 },
          { type: '建筑房地产', value: 251 },
          { type: '教育', value: 367 },
          { type: 'IT 通讯电子', value: 491 },
          { type: '社会公共管理', value: 672 },
          { type: '医疗卫生', value: 868 },
          { type: '金融保险', value: 1234 }
        ],
        chart: {
          padding: [10, 0, 0, 0],
          position: 'type*value',
          label: 'type',
          value: 'value',
          alias: '',
          tooltip: {
            title: []
          },
          slider: false
        }
      }
    }
  },
  idName: 'c'
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
    container: props.idName || 'c', // 指定图表容器 ID
    autoFit: true,
    height: props.params.style.height, // 指定图表高度
    padding: chartSet.padding
  })

  chart.value.data(data)
  chart.value.scale({
    value: {
      // max: 100,
      // min: 0,
      alias: chartSet.alias
    }
    // formatter: (datum:any) => {
    //   return { label1: '排名：', value1: datum.rank, label2: '访问量：', value2: datum.value, datum }
    // }
  })
  chart.value.axis(chartSet.label, {
    title: null,
    tickLine: null,
    line: null
  })

  chart.value.axis(chartSet.value, {
    label: null,
    title: {
      offset: 60,
      style: {
        fontSize: 12,
        fontWeight: 300
      }
    }
  })

  chart.value.tooltip({
    showTitle: true,
    // title:chartSet.title || '' + (chartSet.alias ? ('（' + chartSet.alias + '）') : ''),
    title: (title: any, datum: any) => {
      let myTitle = `${datum[chartSet.position.split('*')[0]]}   `
      chartSet.tooltip.title.length && chartSet.tooltip.title.forEach((item: any) => {
        myTitle += `${item.label}：${datum[item.fieldName]}  `
      })
      return chartSet?.tooltip?.title?.length ? myTitle : datum[chartSet.position.split('*')[0]]
    },
    showCrosshairs: true,
    shared: true,
    itemTpl: `
      <li class="g2-tooltip-list-item">
        <span class="g2-tooltip-marker" style="background-color: {color};"></span>
        <span class="g2-tooltip-name">{name}</span>：
        <span class="g2-tooltip-value">{value}</span>
      </li>
    `
  })

  // 是否展示图例
  if (chartSet?.legend?.isShow || chartSet?.legend) {
    chart.value.legend({ position: chartSet?.legend?.position || 'top' })
  } else {
    chart.value.legend(false)
  }

  chart.value.coordinate().transpose()
  chart.value
    .interval()
    .position(chartSet.position)
    .size(10)
    .label(chartSet.value, {
      style: {
        fill: '#8d8d8d'
      },
      offset: 10
    })
  chart.value.interaction('element-active')

  if (chartSet.slider) {
    chart.value.option('slider', {
      type: 'vertical',
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
.MyCtGuge {
}
</style>
