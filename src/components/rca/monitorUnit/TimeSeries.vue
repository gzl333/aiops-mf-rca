<!-- 时序信息组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'
import { lineData } from 'components/common/myctline'

import MyCtLine from 'src/components/common/MyCtLine.vue'
import EditWarningLine from './EditWarningLine.vue'

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
  activeId: string
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
const loadRef = ref()
const progressRef = ref()
const socketRef = ref()
const diskRWRef = ref()
const diskUsedRef = ref()
const diskIOPSRef = ref()
const diskAwaitRef = ref()
const IOUtilRef = ref()

const cParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: lineData,
    chart: {
      position: 'time*cpu',
      padding: [15, 50, 20, 30],
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
    loadRef.value.show()
    progressRef.value.show()
    socketRef.value.show()
    diskRWRef.value.show()
    diskUsedRef.value.show()
    diskIOPSRef.value.show()
    diskAwaitRef.value.show()
    IOUtilRef.value.show()
  } else {
    cpuRef.value.hidden()
    memoryRef.value.hidden()
    loadRef.value.hidden()
    progressRef.value.hidden()
    socketRef.value.hidden()
    diskRWRef.value.hidden()
    diskUsedRef.value.hidden()
    diskIOPSRef.value.hidden()
    diskAwaitRef.value.hidden()
    IOUtilRef.value.hidden()
  }
})

const editLineRef = ref()
const editLine = (type: string) => {
  console.log(type)
  editLineRef.value.show()
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="TimeSeries" v-if="isShow">
    <div class="row">
      <div class="col-6 q-pa-sm">
        <div class="row items-center">
          <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU使用率</p>
          <i
            class="lar la-edit text-aiops-primary text-subtitle1 text-weight-bold cursor-pointer q-pl-xs"
            @click="editLine('cpuUsed')"
          >
            <q-tooltip>
              修改预警线
            </q-tooltip>
          </i>
        </div>

        <my-ct-line ref="cpuRef" :params="cParams" :idName="`cpu${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存信息</p>
        <my-ct-line ref="memoryRef" :params="cParams" :idName="`memory${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统平均负载</p>
        <my-ct-line ref="loadRef" :params="cParams" :idName="`load${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 进程运行状态</p>
        <my-ct-line ref="progressRef" :params="cParams" :idName="`progress${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 网络Socket连接信息</p>
        <my-ct-line ref="socketRef" :params="cParams" :idName="`socket${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘使用率</p>
        <my-ct-line ref="diskUsedRef" :params="cParams" :idName="`diskUsed${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每秒磁盘读写容量</p>
        <my-ct-line ref="diskRWRef" :params="cParams" :idName="`diskRW${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘读写速率（IOPS）</p>
        <my-ct-line ref="diskIOPSRef" :params="cParams" :idName="`diskIOPS${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <!-- 读&写 双折线 -->
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每次IO读写的耗时（参考：小于100ms）</p>
        <my-ct-line ref="diskAwaitRef" :params="cParams" :idName="`diskAwait${activeId}`"></my-ct-line>
      </div>

      <div class="col-6 q-pa-sm">
        <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每1秒内I/O操作耗时占比（I/O Util）</p>
        <my-ct-line ref="IOUtilRef" :params="cParams" :idName="`IOUtil${activeId}`"></my-ct-line>
      </div>
    </div>
    <edit-warning-line ref="editLineRef"></edit-warning-line>
  </div>
</template>

<style lang="scss" scoped>
.TimeSeries {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
