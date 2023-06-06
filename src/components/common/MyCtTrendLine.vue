<!-- 折线+趋势图 (不能加滑块) -->
<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue'
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

import { lineData } from './myctrend'
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
        data: [{ value: 5.6 }]
      }
    }
  },
  idName: 'c'
})

const chart = ref()
const ds = new DataSet()
const isShow = ref(false)

const show = async () => {
  isShow.value = true
  await nextTick()

  chart.value = new Chart({
    container: props.idName,
    autoFit: true,
    height: 180,
    padding: [10, 20, 20, 20]
  })

  chart.value.scale({
    Deaths: {
      sync: true,
      nice: true
    },
    death: {
      sync: true,
      nice: true
    }
  })

  const dv1 = ds.createView().source(lineData)

  dv1.transform({
    type: 'map',
    callback: (row) => {
      if (typeof (row.Deaths) === 'string') {
        row.Deaths = row.Deaths.replace(',', '')
      }
      row.Deaths = parseInt(row.Deaths, 10)
      row.death = row.Deaths
      row.year = row.Year
      return row
    }
  })

  const view1 = chart.value.createView()
  view1.data(dv1.rows)
  view1.axis('Year', {
    subTickLine: {
      count: 3,
      length: 3
    },
    tickLine: {
      length: 6
    }
  })
  view1.axis('Deaths', {
    label: {
      formatter: text => {
        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
    }
  })
  view1.line().position('Year*Deaths')

  const dv2 = ds.createView().source(dv1.rows)
  dv2.transform({
    type: 'regression',
    method: 'polynomial',
    fields: ['year', 'death'],
    bandwidth: 0.1,
    as: ['year', 'death']
  })

  const view2 = chart.value.createView()
  view2.axis(false)
  view2.data(dv2.rows)
  view2.line().position('year*death').style({
    stroke: '#969696',
    lineDash: [3, 3]
  })
    .tooltip(false)
  view1.annotation().text({
    content: '',
    position: ['1970', 2500],
    style: {
      fill: '#8c8c8c',
      fontSize: 14,
      fontWeight: 300
    },
    offsetY: -70
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
