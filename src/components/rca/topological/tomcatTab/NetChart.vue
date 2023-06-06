<!-- 网络组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'
import { lineData } from 'components/common/myctline'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'

import MyCtTrendLine from 'components/common/MyCtTrendLine.vue'

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

const bandwidthRef = ref()
const trafficRef = ref()
const socketRef = ref()

const bandwidthParams = reactive({
  style: {
    width: 350,
    height: 180
  },
  info: {
    data: [
      { time: '10:17', type: '上传', value: -203 },
      { time: '10:17', type: '下载', value: 329 },
      { time: '10:19', type: '上传', value: -243 },
      { time: '10:19', type: '下载', value: 316 },
      { time: '10:21', type: '上传', value: -223 },
      { time: '10:21', type: '下载', value: 336 },
      { time: '10:23', type: '上传', value: -223 },
      { time: '10:23', type: '下载', value: 346 },
      { time: '10:25', type: '上传', value: -217 },
      { time: '10:25', type: '下载', value: 328 },
      { time: '10:27', type: '上传', value: -239 },
      { time: '10:27', type: '下载', value: 316 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 55],
      color: {
        type: 'type',
        color: ['#0090FF', '#FC5531']
      },
      alias: 'kb/s',
      area: true,
      annotation: {
        line: {
          isHas: false
        },
        regionFilter: {
          isHas: false
        }
      },
      legend: true
    }
  }
})
const trafficParams = reactive({
  style: {
    width: 350,
    height: 180
  },
  info: {
    data: [
      { time: '10:17', type: '上传', value: -203 },
      { time: '10:17', type: '下载', value: 329 },
      { time: '10:19', type: '上传', value: -243 },
      { time: '10:19', type: '下载', value: 316 },
      { time: '10:21', type: '上传', value: -223 },
      { time: '10:21', type: '下载', value: 336 },
      { time: '10:23', type: '上传', value: -223 },
      { time: '10:23', type: '下载', value: 346 },
      { time: '10:25', type: '上传', value: -217 },
      { time: '10:25', type: '下载', value: 328 },
      { time: '10:27', type: '上传', value: -239 },
      { time: '10:27', type: '下载', value: 316 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 55],
      color: {
        type: 'type',
        color: ['#21BA45', '#FC5531']
      },
      alias: 'MiB',
      area: true,
      annotation: {
        line: {
          isHas: false
        },
        regionFilter: {
          isHas: false
        }
      },
      legend: true
    }
  }
})
const socketParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'CurrEstab', value: 13.0 },
      { time: '10:17', type: 'TCP_tw', value: 10.2 },
      { time: '10:17', type: 'Sockets_used', value: 1.02 },
      { time: '10:17', type: 'UDP_inuse', value: 16.0 },

      { time: '10:17', type: 'TCP_alloc', value: 30 },
      { time: '10:17', type: 'Tcp_InSegs', value: 185 },
      { time: '10:17', type: 'Tcp_OutSegs', value: 127 },
      { time: '10:17', type: 'Tcp_RetransSegs', value: 0.05 },

      { time: '10:19', type: 'CurrEstab', value: 13.0 },
      { time: '10:19', type: 'TCP_tw', value: 10.2 },
      { time: '10:19', type: 'Sockets_used', value: 1.09 },
      { time: '10:19', type: 'UDP_inuse', value: 16.0 },
      { time: '10:19', type: 'TCP_alloc', value: 30.22 },
      { time: '10:19', type: 'Tcp_InSegs', value: 185 },
      { time: '10:19', type: 'Tcp_OutSegs', value: 127.09 },
      { time: '10:19', type: 'Tcp_RetransSegs', value: 0.05 },

      { time: '10:21', type: 'CurrEstab', value: 13.0 },
      { time: '10:21', type: 'TCP_tw', value: 10.2 },
      { time: '10:21', type: 'Sockets_used', value: 1.09 },
      { time: '10:21', type: 'UDP_inuse', value: 16.0 },
      { time: '10:21', type: 'TCP_alloc', value: 30.22 },
      { time: '10:21', type: 'Tcp_InSegs', value: 185 },
      { time: '10:21', type: 'Tcp_OutSegs', value: 127.09 },
      { time: '10:21', type: 'Tcp_RetransSegs', value: 0.05 },

      { time: '10:23', type: 'CurrEstab', value: 13.0 },
      { time: '10:23', type: 'TCP_tw', value: 10.2 },
      { time: '10:23', type: 'Sockets_used', value: 1.09 },
      { time: '10:23', type: 'UDP_inuse', value: 16.0 },
      { time: '10:23', type: 'TCP_alloc', value: 30.22 },
      { time: '10:23', type: 'Tcp_InSegs', value: 185 },
      { time: '10:23', type: 'Tcp_OutSegs', value: 127.09 },
      { time: '10:23', type: 'Tcp_RetransSegs', value: 0.05 },

      { time: '10:25', type: 'CurrEstab', value: 13.0 },
      { time: '10:25', type: 'TCP_tw', value: 10.2 },
      { time: '10:25', type: 'Sockets_used', value: 1.09 },
      { time: '10:25', type: 'UDP_inuse', value: 16.0 },
      { time: '10:25', type: 'TCP_alloc', value: 30.22 },
      { time: '10:25', type: 'Tcp_InSegs', value: 185 },
      { time: '10:25', type: 'Tcp_OutSegs', value: 127.09 },
      { time: '10:25', type: 'Tcp_RetransSegs', value: 0.05 },

      { time: '10:27', type: 'CurrEstab', value: 13.0 },
      { time: '10:27', type: 'TCP_tw', value: 10.2 },
      { time: '10:27', type: 'Sockets_used', value: 1.09 },
      { time: '10:27', type: 'UDP_inuse', value: 16.0 },
      { time: '10:27', type: 'TCP_alloc', value: 30.22 },
      { time: '10:27', type: 'Tcp_InSegs', value: 185 },
      { time: '10:27', type: 'Tcp_OutSegs', value: 127.09 },
      { time: '10:27', type: 'Tcp_RetransSegs', value: 0.05 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: 'type',
      area: false,
      alias: 'k',
      annotation: {
        line: {
          isHas: false
        },
        regionFilter: {
          isHas: false
        }
      },
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
    trafficRef.value.show()
    bandwidthRef.value.show()
    socketRef.value.show()
  } else {
    trafficRef.value.hidden()
    bandwidthRef.value.hidden()
    socketRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="NetChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每分钟网络带宽使用</p>
      <my-ct-line ref="bandwidthRef" :params="bandwidthParams" idName="bandwidth"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每分钟流量</p>
      <my-ct-column ref="trafficRef" :params="trafficParams" idName="traffic"></my-ct-column>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 网络socket连接信息</p>
      <my-ct-line ref="socketRef" :params="socketParams" idName="socket"></my-ct-line>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.NetChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
