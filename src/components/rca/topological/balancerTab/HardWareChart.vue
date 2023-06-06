<!-- 硬件指标组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'

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
    avrCPURef.value.show()
    memoryUsedRef.value.show()
  } else {
    avrCPURef.value.hidden()
    memoryUsedRef.value.hidden()
  }
})

const avrCPURef = ref()
const memoryUsedRef = ref()
const avrCPUParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    title: '',
    data: [ // 获取的数据，需要请求接口拿到（写在show方法中）
      // 仪表盘
      { value: 6.15 }
    ],
    chart: {
      annotation: {
        style: {
          stroke: 'l(0) 0:#21BA45 0.7:#F2C037 1:#FC5531'
        }
      }
    }
  }
})

const memoryUsedParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'TMM内存使用', value: 1.0 },
      { time: '10:19', type: 'TMM内存使用', value: 1.2 },
      { time: '10:21', type: 'TMM内存使用', value: 1.2 },
      { time: '10:23', type: 'TMM内存使用', value: 1.7 },
      { time: '10:25', type: 'TMM内存使用', value: 1.7 },
      { time: '10:27', type: 'TMM内存使用', value: 1.1 },
      { time: '10:29', type: 'TMM内存使用', value: 1.1 },
      { time: '10:31', type: 'TMM内存使用', value: 1.2 },
      { time: '10:33', type: 'TMM内存使用', value: 1.2 },
      { time: '10:35', type: 'TMM内存使用', value: 1.7 },
      { time: '10:37', type: 'TMM内存使用', value: 1.7 },
      { time: '10:39', type: 'TMM内存使用', value: 1.1 },
      { time: '10:17', type: '主机内存使用', value: 10 },
      { time: '10:19', type: '主机内存使用', value: 12 },
      { time: '10:21', type: '主机内存使用', value: 12 },
      { time: '10:23', type: '主机内存使用', value: 17 },
      { time: '10:25', type: '主机内存使用', value: 17 },
      { time: '10:27', type: '主机内存使用', value: 11 },
      { time: '10:29', type: '主机内存使用', value: 11 },
      { time: '10:31', type: '主机内存使用', value: 12 },
      { time: '10:33', type: '主机内存使用', value: 12 },
      { time: '10:35', type: '主机内存使用', value: 17 },
      { time: '10:37', type: '主机内存使用', value: 17 },
      { time: '10:39', type: '主机内存使用', value: 11 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: 'type',
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
defineExpose({ show, hidden })
</script>

<template>
  <div class="HardWareChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统cpu使用率</p>
      <my-ct-gauge ref="avrCPURef" :params="avrCPUParams" idName="avrCPU"></my-ct-gauge>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存使用</p>
      <my-ct-line ref="memoryUsedRef" :params="memoryUsedParams" idName="memoryUsed"></my-ct-line>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.HardWareChart {
  margin-left: -10px;

  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
