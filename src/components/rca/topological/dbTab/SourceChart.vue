<!-- 资源 -->
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

const cpuRef = ref()
const cpuSingleRef = ref()
const memoryRef = ref()
const diskUsageRef = ref()
const diskRemainRef = ref()

const cpuParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: [
      { time: '10:17', type: '--cpu-idle', value: 100.00 },
      { time: '10:17', type: '--cpu-iowait', value: 14 },
      { time: '10:17', type: '--cpu-irq', value: 9 },
      { time: '10:19', type: '--cpu-idle', value: 100 },
      { time: '10:19', type: '--cpu-iowait', value: 14 },
      { time: '10:19', type: '--cpu-irq', value: 9 },
      { time: '10:21', type: '--cpu-idle', value: 98 },
      { time: '10:21', type: '--cpu-iowait', value: 14 },
      { time: '10:21', type: '--cpu-irq', value: 9 },
      { time: '10:23', type: '--cpu-idle', value: 100 },
      { time: '10:23', type: '--cpu-iowait', value: 26 },
      { time: '10:23', type: '--cpu-irq', value: 21 },
      { time: '10:25', type: '--cpu-idle', value: 100 },
      { time: '10:25', type: '--cpu-iowait', value: 13 },
      { time: '10:25', type: '--cpu-irq', value: 10 },
      { time: '10:27', type: '--cpu-idle', value: 100 },
      { time: '10:27', type: '--cpu-iowait', value: 23 },
      { time: '10:27', type: '--cpu-irq', value: 16 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FC5531', '#21BA45', '#FFAC33', '#0090FF']
      },
      alias: '%',
      area: false,
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
const cpuSingleParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: [
      { time: '10:17', type: '--cpu0', value: 23 },
      { time: '10:17', type: '--cpu1', value: 14 },
      { time: '10:17', type: '--cpu2', value: 9 },
      { time: '10:17', type: '--cpu3', value: 9 },

      { time: '10:19', type: '--cpu0', value: 21 },
      { time: '10:19', type: '--cpu1', value: 14 },
      { time: '10:19', type: '--cpu2', value: 9 },
      { time: '10:19', type: '--cpu3', value: 5 },

      { time: '10:21', type: '--cpu0', value: 24 },
      { time: '10:21', type: '--cpu1', value: 13 },
      { time: '10:21', type: '--cpu2', value: 8 },
      { time: '10:21', type: '--cpu3', value: 10 },

      { time: '10:23', type: '--cpu0', value: 25 },
      { time: '10:23', type: '--cpu1', value: 16 },
      { time: '10:23', type: '--cpu2', value: 11 },
      { time: '10:23', type: '--cpu3', value: 9 },

      { time: '10:25', type: '--cpu0', value: 24 },
      { time: '10:25', type: '--cpu1', value: 13 },
      { time: '10:25', type: '--cpu2', value: 10 },
      { time: '10:25', type: '--cpu3', value: 9 },

      { time: '10:27', type: '--cpu0', value: 22 },
      { time: '10:27', type: '--cpu1', value: 11 },
      { time: '10:27', type: '--cpu2', value: 10 },
      { time: '10:27', type: '--cpu3', value: 7 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FC5531', '#21BA45', '#FFAC33', '#0090FF']
      },
      alias: '%',
      area: false,
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

const memoryParams = reactive({
  style: {
    width: 350,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '已用', value: 1.2 },
      { time: '10:17', type: '总内存', value: 260 },
      { time: '10:19', type: '已用', value: 1.6 },
      { time: '10:19', type: '总内存', value: 260 },
      { time: '10:21', type: '已用', value: 1.8 },
      { time: '10:21', type: '总内存', value: 260 },
      { time: '10:23', type: '已用', value: 1.7 },
      { time: '10:23', type: '总内存', value: 260 },
      { time: '10:25', type: '已用', value: 1.8 },
      { time: '10:25', type: '总内存', value: 260 },
      { time: '10:27', type: '已用', value: 1.9 },
      { time: '10:27', type: '总内存', value: 260 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 55],
      color: {
        type: 'type',
        color: ['#0090FF', '#FC5531']
      },
      alias: 'GiB',
      shape: 'smooth',
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
const diskUsageParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: [
      { time: '10:17', type: '目录:/boot', value: 18 },
      { time: '10:17', type: '目录:/', value: 14 },
      { time: '10:19', type: '目录:/boot', value: 18 },
      { time: '10:19', type: '目录:/', value: 14 },
      { time: '10:21', type: '目录:/boot', value: 18 },
      { time: '10:21', type: '目录:/', value: 14 },
      { time: '10:23', type: '目录:/boot', value: 18 },
      { time: '10:23', type: '目录:/', value: 16 },
      { time: '10:25', type: '目录:/boot', value: 17 },
      { time: '10:25', type: '目录:/', value: 13 },
      { time: '10:27', type: '目录:/boot', value: 17 },
      { time: '10:27', type: '目录:/', value: 13 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FC5531', '#21BA45', '#FFAC33', '#0090FF']
      },
      alias: '%',
      area: false,
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
const diskRemainParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '目录:/boot-已用', value: 116 },
      { time: '10:17', type: '目录:/-已用', value: 1.39 },
      { time: '10:19', type: '目录:/boot-已用', value: 116 },
      { time: '10:19', type: '目录:/-已用', value: 1.00 },
      { time: '10:21', type: '目录:/boot-已用', value: 113 },
      { time: '10:21', type: '目录:/-已用', value: 1.23 },
      { time: '10:23', type: '目录:/boot-已用', value: 116 },
      { time: '10:23', type: '目录:/-已用', value: 1.29 },
      { time: '10:25', type: '目录:/boot-已用', value: 117 },
      { time: '10:25', type: '目录:/-已用', value: 1.29 },
      { time: '10:27', type: '目录:/boot-已用', value: 96 },
      { time: '10:27', type: '目录:/-已用', value: 1.49 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: 'type',
      area: false,
      alias: 'GiB',
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
    cpuRef.value.show()
    cpuSingleRef.value.show()
    memoryRef.value.show()
    diskUsageRef.value.show()
    diskRemainRef.value.show()
  } else {
    cpuRef.value.hidden()
    cpuSingleRef.value.hidden()
    memoryRef.value.hidden()
    diskUsageRef.value.hidden()
    diskRemainRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="SourceChart" v-if="isShow">
    <!--cpu详细使用率，单核cpu使用率， 内存使用量，swap使用量，磁盘空间使用率，磁盘剩余空间，磁盘吞吐量，磁盘iops使用量，网卡吞吐量 -->

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU详细使用率</p>
      <my-ct-line ref="cpuRef" :params="cpuParams" idName="cpu"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 单核CPU使用率</p>
      <my-ct-line ref="cpuSingleRef" :params="cpuSingleParams" idName="cpuSingle"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存使用量</p>
      <my-ct-line ref="memoryRef" idName="memory" :params="memoryParams"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘空间使用率</p>
      <my-ct-line ref="diskUsageRef" :params="diskUsageParams" idName="diskUsage"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘剩余空间</p>
      <my-ct-line ref="diskRemainRef" :params="diskRemainParams" idName="diskRemain"></my-ct-line>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.SourceChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
