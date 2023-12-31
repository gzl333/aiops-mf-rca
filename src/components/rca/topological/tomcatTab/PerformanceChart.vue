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

const requestRef = ref()
const responseTimeRef = ref()
const sysLoadRef = ref()

const requestParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: lineData,
    chart: {
      position: 'time*cpu',
      padding: [15, 50, 30, 30],
      color: 'date',
      annotation: {
        line: {
          isHas: true
        },
        regionFilter: {
          isHas: true
        }
      }
    }
  }
})
const resTimeParams = reactive({
  style: {
    width: 350,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '超出时间', value: 80 },
      { time: '10:17', type: '正常时间', value: 200 },
      { time: '10:19', type: '超出时间', value: 0 },
      { time: '10:19', type: '正常时间', value: 130 },
      { time: '10:21', type: '超出时间', value: 0 },
      { time: '10:21', type: '正常时间', value: 160 },
      { time: '10:23', type: '超出时间', value: 40 },
      { time: '10:23', type: '正常时间', value: 200 },
      { time: '10:25', type: '超出时间', value: 10 },
      { time: '10:25', type: '正常时间', value: 200 },
      { time: '10:27', type: '超出时间', value: 20 },
      { time: '10:27', type: '正常时间', value: 200 }
    ],
    chart: {
      position: 'time*value',
      adjust: 'stack',
      color: {
        type: 'type',
        color: ['#fc5531', '#40a9ff']
      },
      alias: 'ms'
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
      color: 'type',
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
    requestRef.value.show()
    responseTimeRef.value.show()
    sysLoadRef.value.show()
  } else {
    requestRef.value.hidden()
    responseTimeRef.value.hidden()
    sysLoadRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 请求数</p>
      <my-ct-line ref="requestRef" :params="requestParams" idName="request"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 平均响应时间</p>
      <my-ct-column ref="responseTimeRef" idName="responseTime" :params="resTimeParams"></my-ct-column>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统平均负载</p>
      <my-ct-line ref="sysLoadRef" :params="sysLoadParams" idName="sysLoad"></my-ct-line>
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
