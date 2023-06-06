<!-- 性能组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'
import { lineData } from 'components/common/myctline'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtGauge from 'components/common/MyCtGauge.vue'

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
    throughputTotalRef.value.show()
    throughputRef.value.show()
  } else {
    throughputTotalRef.value.hidden()
    throughputRef.value.hidden()
  }
})

const throughputTotalRef = ref()
const throughputRef = ref()
const throughputTotalParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    title: '吞吐总量',
    data: [
      { time: '10:17', type: 'Server Bits', value: 394 },
      { time: '10:19', type: 'Server Bits', value: 412 },
      { time: '10:21', type: 'Server Bits', value: 385 },
      { time: '10:23', type: 'Server Bits', value: 468 },
      { time: '10:25', type: 'Server Bits', value: 476 },
      { time: '10:27', type: 'Server Bits', value: 465 },
      { time: '10:29', type: 'Server Bits', value: 469 },
      { time: '10:31', type: 'Server Bits', value: 412 },
      { time: '10:33', type: 'Server Bits', value: 437 },
      { time: '10:35', type: 'Server Bits', value: 417 },
      { time: '10:37', type: 'Server Bits', value: 479 },
      { time: '10:39', type: 'Server Bits', value: 485 },
      { time: '10:17', type: 'Client Bits', value: 94 },
      { time: '10:19', type: 'Client Bits', value: 41 },
      { time: '10:21', type: 'Client Bits', value: 85 },
      { time: '10:23', type: 'Client Bits', value: 68 },
      { time: '10:25', type: 'Client Bits', value: 76 },
      { time: '10:27', type: 'Client Bits', value: 65 },
      { time: '10:29', type: 'Client Bits', value: 69 },
      { time: '10:31', type: 'Client Bits', value: 72 },
      { time: '10:33', type: 'Client Bits', value: 37 },
      { time: '10:35', type: 'Client Bits', value: 47 },
      { time: '10:37', type: 'Client Bits', value: 79 },
      { time: '10:39', type: 'Client Bits', value: 85 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: 'type',
      alias: 'MB',
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
const throughputParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'Client Bits In', value: 132 },
      { time: '10:19', type: 'Client Bits In', value: 112 },
      { time: '10:21', type: 'Client Bits In', value: 112 },
      { time: '10:23', type: 'Client Bits In', value: 117 },
      { time: '10:25', type: 'Client Bits In', value: 117 },
      { time: '10:27', type: 'Client Bits In', value: 111 },
      { time: '10:29', type: 'Client Bits In', value: 111 },
      { time: '10:31', type: 'Client Bits In', value: 122 },
      { time: '10:33', type: 'Client Bits In', value: 132 },
      { time: '10:35', type: 'Client Bits In', value: 157 },
      { time: '10:37', type: 'Client Bits In', value: 137 },
      { time: '10:39', type: 'Client Bits In', value: 121 },
      { time: '10:17', type: 'Client Bits Out', value: 142 },
      { time: '10:19', type: 'Client Bits Out', value: 122 },
      { time: '10:21', type: 'Client Bits Out', value: 132 },
      { time: '10:23', type: 'Client Bits Out', value: 127 },
      { time: '10:25', type: 'Client Bits Out', value: 137 },
      { time: '10:27', type: 'Client Bits Out', value: 121 },
      { time: '10:29', type: 'Client Bits Out', value: 111 },
      { time: '10:31', type: 'Client Bits Out', value: 132 },
      { time: '10:33', type: 'Client Bits Out', value: 142 },
      { time: '10:35', type: 'Client Bits Out', value: 167 },
      { time: '10:37', type: 'Client Bits Out', value: 157 },
      { time: '10:39', type: 'Client Bits Out', value: 131 },
      { time: '10:17', type: 'Server Bits In', value: 332 },
      { time: '10:19', type: 'Server Bits In', value: 312 },
      { time: '10:21', type: 'Server Bits In', value: 312 },
      { time: '10:23', type: 'Server Bits In', value: 317 },
      { time: '10:25', type: 'Server Bits In', value: 317 },
      { time: '10:27', type: 'Server Bits In', value: 311 },
      { time: '10:29', type: 'Server Bits In', value: 311 },
      { time: '10:31', type: 'Server Bits In', value: 322 },
      { time: '10:33', type: 'Server Bits In', value: 332 },
      { time: '10:35', type: 'Server Bits In', value: 357 },
      { time: '10:37', type: 'Server Bits In', value: 337 },
      { time: '10:39', type: 'Server Bits In', value: 321 },
      { time: '10:17', type: 'Server Bits Out', value: 342 },
      { time: '10:19', type: 'Server Bits Out', value: 322 },
      { time: '10:21', type: 'Server Bits Out', value: 332 },
      { time: '10:23', type: 'Server Bits Out', value: 327 },
      { time: '10:25', type: 'Server Bits Out', value: 337 },
      { time: '10:27', type: 'Server Bits Out', value: 321 },
      { time: '10:29', type: 'Server Bits Out', value: 311 },
      { time: '10:31', type: 'Server Bits Out', value: 332 },
      { time: '10:33', type: 'Server Bits Out', value: 342 },
      { time: '10:35', type: 'Server Bits Out', value: 367 },
      { time: '10:37', type: 'Server Bits Out', value: 357 },
      { time: '10:39', type: 'Server Bits Out', value: 331 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: 'type',
      alias: 'MB',
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
defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 吞吐总量</p>
      <my-ct-line ref="throughputTotalRef" :params="throughputTotalParams" idName="throughputTotal"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 吞吐</p>
      <my-ct-line ref="throughputRef" :params="throughputParams" idName="throughput"></my-ct-line>
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
