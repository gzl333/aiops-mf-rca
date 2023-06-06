<!-- 性能组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtRadialLine from 'components/common/MyCtRadialLine.vue'

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
    CPURateRef.value.show()
  } else {
    avrCPURef.value.hidden()
    CPURateRef.value.hidden()
  }
})

const avrCPURef = ref()
const CPURateRef = ref()
const avrCPUParams = reactive({
  style: {
    width: 400,
    height: 180
  },
  info: {
    title: '',
    data: [
      { term: '192.168.14.1', count: 0.77 },
      { term: '192.168.21.1', count: 0.89 },
      { term: '159.226.14.1', count: 0.135 }
    ],
    chart: {
      padding: [15, 0, 0, 0]
    }
  }
})
const CPURateParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '159.226.14.71-cpu使用率', value: 10 },
      { time: '10:17', type: '192.168.14.13-cpu使用率', value: 18 },
      { time: '10:17', type: '192.168.21.13-cpu使用率', value: 18 },
      { time: '10:19', type: '159.226.14.71-cpu使用率', value: 12 },
      { time: '10:19', type: '192.168.21.13-cpu使用率', value: 12 },
      { time: '10:19', type: '192.168.14.13-cpu使用率', value: 12 },
      { time: '10:21', type: '192.168.14.13-cpu使用率', value: 15 },
      { time: '10:21', type: '192.168.21.13-cpu使用率', value: 17 },
      { time: '10:21', type: '159.226.14.71-cpu使用率', value: 13 },
      { time: '10:23', type: '192.168.14.13-cpu使用率', value: 18 },
      { time: '10:23', type: '192.168.21.13-cpu使用率', value: 17 },
      { time: '10:23', type: '159.226.14.71-cpu使用率', value: 21 },
      { time: '10:25', type: '192.168.14.13-cpu使用率', value: 11 },
      { time: '10:25', type: '192.168.21.13-cpu使用率', value: 13 },
      { time: '10:25', type: '159.226.14.71-cpu使用率', value: 17 },
      { time: '10:27', type: '192.168.14.13-cpu使用率', value: 19 },
      { time: '10:27', type: '192.168.21.13-cpu使用率', value: 12 },
      { time: '10:27', type: '159.226.14.71-cpu使用率', value: 13 },
      { time: '10:29', type: '192.168.14.13-cpu使用率', value: 17 },
      { time: '10:29', type: '192.168.21.13-cpu使用率', value: 16 },
      { time: '10:29', type: '159.226.14.71-cpu使用率', value: 15 },
      { time: '10:31', type: '192.168.14.13-cpu使用率', value: 18 },
      { time: '10:31', type: '192.168.21.13-cpu使用率', value: 12 },
      { time: '10:31', type: '159.226.14.71-cpu使用率', value: 13 }
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
defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 平均CPU使用率</p>
      <my-ct-radial-line ref="avrCPURef" :params="avrCPUParams" idName="avrCPU"></my-ct-radial-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU使用率</p>
      <my-ct-line ref="CPURateRef" :params="CPURateParams" idName="CPURate"></my-ct-line>
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
