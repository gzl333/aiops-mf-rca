<!-- f5负载均衡器弹框 -->
<script setup lang="ts">
import { ref, reactive, computed, withDefaults, onMounted, nextTick, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'
import { useRouter } from 'vue-router'

import MyDialog from 'components/common/MyDialog.vue'
import HardWareChart from '../balancerTab/HardWareChart.vue'
import PerformanceChart from '../balancerTab/PerformanceChart.vue'
import PortChart from '../balancerTab/PortChart.vue'
import ErrorInfo from '../ErrorInfo.vue'

const router = useRouter()
const useToRoute = (path: string) => {
  router.push({ path })
}

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
interface NodeParams {
  style?: {
    width?: number
    maxWidth?: string | number
    [propName: string]: any
  },
  info?: {
    systemID: string
    type: string
    elementID: string
    timeRange: [string, string]
    title: string
    [propName: string]: any
  },
  [propName: string]: any
}

interface Props {
  params?: NodeParams
  currentSelect?: any
}

const props = withDefaults(defineProps<Props>(), {
  params: () => {
    return {
      style: {
        width: 450,
        maxWidth: '70vw',
        maxHeight: '100vh'
      },
      info: {
        systemID: 'system00001',
        type: 'node',
        elementID: 'node00001',
        timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')],
        title: '节点详情'
      }
    }
  }
})
const emits = defineEmits(['clearState'])

const clearState = () => {
  emits('clearState')
}

const dialog = ref()

const tab = ref('hardware')
const hardwareRef = ref()
const performanceRef = ref()
const portRef = ref()

const show = async () => {
  dialog.value.show()
  tab.value = 'hardware'
  await nextTick() // 等待获取到Ref后才能执行下面的操作， 否则获取不到chost组件实例

  hardwareRef.value.show()
}

const hidden = () => {
  dialog.value.hidden()
}

watch(() => tab.value, async (val) => {
  switch (val) {
    case 'hardware':
      await nextTick()
      hardwareRef.value.show()
      break
    case 'performance':
      await nextTick()
      performanceRef.value.show()
      break
    case 'port':
      await nextTick()
      portRef.value.show()
      break
    default:
      break
  }
})

const errorInfoRef = ref()
const errorParams = reactive({
  style: {
    width: 800,
    maxWidth: '70vw',
    maxHeight: '100vh'
  },
  info: {
    systemID: 'system00001',
    type: 'node',
    elementID: 'node00001',
    timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')],
    title: '告警信息'
  }
})

const showError = () => {
  errorInfoRef.value.show()
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="NodeBalancer">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <template #container>
        <div class="q-px-xs">
          <div class="row">
            <div class="row col-7">
              <label>告警数：</label>
              <p class="text-aiops-primary cursor-pointer" @click="showError">19</p>
            </div>
            <div class="row col-5">
              <label>日志：</label>
              <p class="text-aiops-primary cursor-pointer">4728</p>
            </div>
          </div>

          <div class="row">
            <div class="row col-7">
              <label>运行时长：</label>
              <p>19天</p>
            </div>
            <div class="row col-5">
              <label class="text-aiops-primary cursor-pointer" @click="useToRoute('/location/monitorUnit')" v-close-popup>查看详情</label>
            </div>
          </div>
        </div>

        <q-separator class="q-mt-sm" color="aiops-border" />

        <div class="q-px-xs">
          <q-tabs
            class="q-mt-sm"
            v-model="tab"
            dense
            active-color="white"
            indicator-color="aiops-primary"
            active-bg-color="aiops-primary"
            align="left"
            :breakpoint="0"
            narrow-indicator
          >
            <q-tab name="hardware" label="硬件" />
            <q-tab name="performance" label="性能" />
            <q-tab name="port" label="端口" />
          </q-tabs>

          <q-separator style="margin-top: -1px;" color="aiops-border" />

          <q-scroll-area style="height: 400px">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="hardware" style="padding: 12px 0">
                <!-- 硬件指标 -->
                <hard-ware-chart ref="hardwareRef"></hard-ware-chart>
              </q-tab-panel>

              <q-tab-panel name="performance" style="padding: 12px 0">
                <!-- 性能指标 -->
                <performance-chart ref="performanceRef"></performance-chart>
              </q-tab-panel>

              <q-tab-panel name="port" style="padding: 12px 0">
                <!-- 端口 -->
                <port-chart ref="portRef"></port-chart>
              </q-tab-panel>
            </q-tab-panels>
          </q-scroll-area>
        </div>
      </template>

      <template #actions>
        <q-btn padding="4px 14px" outline style="color: #606266;" label="关闭" v-close-popup />
      </template>
    </my-dialog>

    <error-info ref="errorInfoRef" :nodeParams="errorParams"></error-info>
  </div>
</template>

<style lang="scss" scoped>
.NodeBalancer {
}
</style>
