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
const memoryRef = ref()
const diskRef = ref()

const cpuParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: [
      { time: '10:17', type: '总使用率', value: 0.22 },
      { time: '10:17', type: '用户使用率', value: 0.14 },
      { time: '10:17', type: '磁盘使用率', value: 0.09 },
      { time: '10:17', type: '系统使用率', value: 0.00 },
      { time: '10:19', type: '总使用率', value: 0.22 },
      { time: '10:19', type: '用户使用率', value: 0.14 },
      { time: '10:19', type: '磁盘使用率', value: 0.09 },
      { time: '10:19', type: '系统使用率', value: 0.00 },
      { time: '10:21', type: '总使用率', value: 0.23 },
      { time: '10:21', type: '用户使用率', value: 0.14 },
      { time: '10:21', type: '磁盘使用率', value: 0.09 },
      { time: '10:21', type: '系统使用率', value: 0.00 },
      { time: '10:23', type: '总使用率', value: 0.36 },
      { time: '10:23', type: '用户使用率', value: 0.26 },
      { time: '10:23', type: '磁盘使用率', value: 0.21 },
      { time: '10:23', type: '系统使用率', value: 0.00 },
      { time: '10:25', type: '总使用率', value: 0.30 },
      { time: '10:25', type: '用户使用率', value: 0.13 },
      { time: '10:25', type: '磁盘使用率', value: 0.10 },
      { time: '10:25', type: '系统使用率', value: 0.00 },
      { time: '10:27', type: '总使用率', value: 0.39 },
      { time: '10:27', type: '用户使用率', value: 0.23 },
      { time: '10:27', type: '磁盘使用率', value: 0.16 },
      { time: '10:27', type: '系统使用率', value: 0.00 }
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
          isHas: true
        },
        regionFilter: {
          isHas: true
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
      { time: '10:17', type: '已用', value: 992 },
      { time: '10:17', type: '总内存', value: 1007.53 },
      { time: '10:19', type: '已用', value: 996 },
      { time: '10:19', type: '总内存', value: 1007.53 },
      { time: '10:21', type: '已用', value: 998 },
      { time: '10:21', type: '总内存', value: 1007.53 },
      { time: '10:23', type: '已用', value: 997 },
      { time: '10:23', type: '总内存', value: 1007.53 },
      { time: '10:25', type: '已用', value: 998 },
      { time: '10:25', type: '总内存', value: 1007.53 },
      { time: '10:27', type: '已用', value: 990 },
      { time: '10:27', type: '总内存', value: 1007.53 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 55],
      color: {
        type: 'type',
        color: ['#0090FF', '#FC5531']
      },
      alias: 'GiB',
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
const diskParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '总磁盘量', value: 15.6 },
      { time: '10:17', type: '总使用量', value: 1.39 },
      { time: '10:19', type: '总磁盘量', value: 15.6 },
      { time: '10:19', type: '总使用量', value: 1.00 },
      { time: '10:21', type: '总磁盘量', value: 15.6 },
      { time: '10:21', type: '总使用量', value: 1.23 },
      { time: '10:23', type: '总磁盘量', value: 15.6 },
      { time: '10:23', type: '总使用量', value: 1.29 },
      { time: '10:25', type: '总磁盘量', value: 15.6 },
      { time: '10:25', type: '总使用量', value: 1.29 },
      { time: '10:27', type: '总磁盘量', value: 15.6 },
      { time: '10:27', type: '总使用量', value: 1.49 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: 'type',
      area: false,
      alias: 'TiB',
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
    memoryRef.value.show()
    diskRef.value.show()
  } else {
    cpuRef.value.hidden()
    memoryRef.value.hidden()
    diskRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="SourceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU使用率</p>
      <my-ct-line ref="cpuRef" :params="cpuParams" idName="cpu"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存信息</p>
      <my-ct-line ref="memoryRef" idName="memory" :params="memoryParams"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘信息</p>
      <my-ct-line ref="diskRef" :params="diskParams" idName="disk"></my-ct-line>
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
