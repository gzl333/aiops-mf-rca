<!-- 性能组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'
import { lineData } from 'components/common/myctline'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'

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

const qpsRef = ref()
const tpsRef = ref()
const sysLoadRef = ref()
const diskThroughputRef = ref()
const diskIOPSRef = ref()
const networkCardThRef = ref()

const qpsParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: lineData,
    chart: {
      position: 'time*cpu',
      padding: [15, 50, 20, 30],
      color: 'date',
      area: false,
      shape: 'smooth',
      annotation: {
        line: {
          isHas: false
        },
        regionFilter: {
          isHas: false
        }
      }
    }
  }
})
const tpsParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: lineData,
    chart: {
      position: 'time*cpu',
      padding: [15, 50, 20, 30],
      area: true,
      color: {
        type: 'date',
        color: ['#21BA45']
      },
      annotation: {
        line: {
          isHas: false
        },
        regionFilter: {
          isHas: false
        }
      }
    }
  }
})
const sysLoadParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '1m', value: 1.02 },
      { time: '10:17', type: '5m', value: 1.09 },
      { time: '10:17', type: '15m', value: 1.39 },
      { time: '10:19', type: '1m', value: 1.00 },
      { time: '10:19', type: '5m', value: 1.09 },
      { time: '10:19', type: '15m', value: 1.00 },
      { time: '10:21', type: '1m', value: 2.3 },
      { time: '10:21', type: '5m', value: 1.53 },
      { time: '10:21', type: '15m', value: 1.23 },
      { time: '10:23', type: '1m', value: 1.34 },
      { time: '10:23', type: '5m', value: 1.56 },
      { time: '10:23', type: '15m', value: 1.29 },
      { time: '10:25', type: '1m', value: 1.45 },
      { time: '10:25', type: '5m', value: 1.63 },
      { time: '10:25', type: '15m', value: 1.29 },
      { time: '10:27', type: '1m', value: 1.34 },
      { time: '10:27', type: '5m', value: 1.74 },
      { time: '10:27', type: '15m', value: 1.49 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 30],
      color: {
        type: 'type',
        color: ['#21BA45', '#FFAC33', '#0090FF']
      },
      alias: '',
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
const diskThroughputParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'Read:sda', value: 1.02 },
      { time: '10:17', type: 'Write:sda', value: 1.09 },
      { time: '10:19', type: 'Read:sda', value: 1.00 },
      { time: '10:19', type: 'Write:sda', value: 1.09 },
      { time: '10:21', type: 'Read:sda', value: 2.3 },
      { time: '10:21', type: 'Write:sda', value: 1.53 },
      { time: '10:23', type: 'Read:sda', value: 1.34 },
      { time: '10:23', type: 'Write:sda', value: 480 },
      { time: '10:25', type: 'Read:sda', value: 1.45 },
      { time: '10:25', type: 'Write:sda', value: 1.63 },
      { time: '10:27', type: 'Read:sda', value: 1.34 },
      { time: '10:27', type: 'Write:sda', value: 1.74 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FFAC33', '#0090FF']
      },
      alias: 'Mib',
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
const diskIOPSParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'Read:sda', value: 0 },
      { time: '10:17', type: 'Write:sda', value: 21.09 },
      { time: '10:19', type: 'Read:sda', value: 0 },
      { time: '10:19', type: 'Write:sda', value: 131.09 },
      { time: '10:21', type: 'Read:sda', value: 0 },
      { time: '10:21', type: 'Write:sda', value: 41.53 },
      { time: '10:23', type: 'Read:sda', value: 0 },
      { time: '10:23', type: 'Write:sda', value: 150 },
      { time: '10:25', type: 'Read:sda', value: 0 },
      { time: '10:25', type: 'Write:sda', value: 113 },
      { time: '10:27', type: 'Read:sda', value: 0 },
      { time: '10:27', type: 'Write:sda', value: 24 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FFAC33', '#0090FF']
      },
      alias: 'io/s',
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
const networkCardThParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '-em1-Outgoing', value: 0 },
      { time: '10:17', type: '-em2-Outgoing', value: 0 },
      { time: '10:19', type: '-em1-Outgoing', value: 1 },
      { time: '10:19', type: '-em2-Outgoing', value: 31.09 },
      { time: '10:21', type: '-em1-Outgoing', value: 0 },
      { time: '10:21', type: '-em2-Outgoing', value: 41.53 },
      { time: '10:23', type: '-em1-Outgoing', value: 4 },
      { time: '10:23', type: '-em2-Outgoing', value: 38.74 },
      { time: '10:25', type: '-em1-Outgoing', value: 0 },
      { time: '10:25', type: '-em2-Outgoing', value: 0 },
      { time: '10:27', type: '-em1-Outgoing', value: 0 },
      { time: '10:27', type: '-em2-Outgoing', value: 24 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FFAC33', '#0090FF']
      },
      alias: 'Mib',
      shape: 'smooth',
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
    qpsRef.value.show()
    tpsRef.value.show()
    sysLoadRef.value.show()
    diskThroughputRef.value.show()
    diskIOPSRef.value.show()
    networkCardThRef.value.show()
  } else {
    qpsRef.value.hidden()
    tpsRef.value.hidden()
    sysLoadRef.value.hidden()
    diskThroughputRef.value.hidden()
    diskIOPSRef.value.hidden()
    networkCardThRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <!-- qps, tps, 系统负载，磁盘吞吐量，磁盘iops使用量，网卡吞吐量 -->
    <div class="q-pa-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> qps</p>
      <my-ct-line ref="qpsRef" :params="qpsParams" idName="qps"></my-ct-line>
    </div>

    <div class="q-pa-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> tps</p>
      <my-ct-line ref="tpsRef" :params="tpsParams" idName="tps"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统负载</p>
      <my-ct-line ref="sysLoadRef" :params="sysLoadParams" idName="sysLoad"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘吞吐量</p>
      <my-ct-line ref="diskThroughputRef" :params="diskThroughputParams" idName="diskThroughput"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘iops使用量</p>
      <my-ct-line ref="diskIOPSRef" :params="diskIOPSParams" idName="diskIOPS"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 网卡吞吐量</p>
      <my-ct-line ref="networkCardThRef" :params="networkCardThParams" idName="networkCardTh"></my-ct-line>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PerformanceChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
