<!-- 网络组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'
import MyCtLineDbY from 'components/common/MyCtLineDbY.vue'
import portData from './portchart'
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
  activeId?: string
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
  idName: 'c',
  activeId: 'activeId'
})

const myPortChartData = reactive(portData)
const chartRefs = reactive([])
const bandwidthParams = reactive({
  style: {
    width: 350,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', flow: 'inflow', flowValue: 125, packet: 'inPackets', packetValue: 43 },
      { time: '10:17', flow: 'outflow', flowValue: 130, packet: 'outPackets', packetValue: 49 },
      { time: '10:19', flow: 'inflow', flowValue: 125, packet: 'inPackets', packetValue: 43 },
      { time: '10:19', flow: 'outflow', flowValue: 130, packet: 'outPackets', packetValue: 49 },
      { time: '10:21', flow: 'inflow', flowValue: 141, packet: 'inPackets', packetValue: 40 },
      { time: '10:21', flow: 'outflow', flowValue: 152, packet: 'outPackets', packetValue: 46 },
      { time: '10:23', flow: 'inflow', flowValue: 143, packet: 'inPackets', packetValue: 43 },
      { time: '10:23', flow: 'outflow', flowValue: 154, packet: 'outPackets', packetValue: 48 },
      { time: '10:25', flow: 'inflow', flowValue: 125, packet: 'inPackets', packetValue: 43 },
      { time: '10:25', flow: 'outflow', flowValue: 130, packet: 'outPackets', packetValue: 49 },
      { time: '10:27', flow: 'inflow', flowValue: 125, packet: 'inPackets', packetValue: 43 },
      { time: '10:27', flow: 'outflow', flowValue: 130, packet: 'outPackets', packetValue: 49 }
    ],
    chart: {
      padding: [15, 60, 70, 60],
      color: {
        type: 'type',
        color: ['#0090FF', '#FC5531']
      },
      alias: ['Mb/s', 'kb/s'],
      legend: true
    }
  }
})

const isShow = ref(false)

const show = async () => {
  isShow.value = true
}

const hidden = async () => {
  isShow.value = false
}

watch(() => isShow.value, async (val) => {
  await nextTick()

  if (val) {
    console.log(chartRefs)
    chartRefs.forEach(item => {
      item.show()
    })
  } else {
    chartRefs.forEach(item => {
      item.hidden()
    })
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="PortChart" v-if="isShow">
    <div class="q-px-sm" v-for="(item, index) in myPortChartData" :key="index">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> {{ item.title }}</p>
      <my-ct-line-db-y :ref="ref => chartRefs[index] = ref" :params="item.params" :idName="`portChart${item.id}`"></my-ct-line-db-y>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PortChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
