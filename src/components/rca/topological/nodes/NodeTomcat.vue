<!-- 主机弹框 -->
<script setup lang="ts">
import { ref, reactive, computed, withDefaults, onMounted, nextTick, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'
import { navigateToUrl } from 'single-spa'

import MyDialog from 'components/common/MyDialog.vue'
import PerformanceChart from '../tomcatTab/PerformanceChart.vue'
import SourceChart from '../tomcatTab/SourceChart.vue'
import NetChart from '../tomcatTab/NetChart.vue'
import ErrorInfo from '../ErrorInfo.vue'

const appPath = process.env.appPath as string
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
    timeRange: string[]
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

const nodeInfo = computed(() => props.currentSelect._cfg.model)
const clearState = () => {
  emits('clearState')
}

const dialog = ref()
const chost = ref()
const cParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    title: '健康值',
    data: [ // 获取的数据，需要请求接口拿到（写在show方法中）
      // 仪表盘
      { value: 7.7 }
    ]
  }
})

// 节点数据
const fields = reactive({
  hostName: {
    label: '主机名',
    value: 'app-1',
    clickable: false
  },
  ip: {
    label: 'IP',
    value: '223.193.36.7',
    clickable: false
  },
  healthyNum: {
    label: '健康值',
    value: '79.0',
    clickable: false
  },
  errorNum: {
    label: '告警数',
    value: 4,
    clickable: true
  },
  uptime: {
    label: '运行时间',
    value: '19.0天',
    clickable: false
  },
  memoryTotal: {
    label: '总内存',
    value: '16G',
    clickable: false
  },
  load5: {
    label: '5分钟负载',
    value: '0.00',
    clickable: false
  },
  cpuUseRate: {
    label: 'CPU使用率',
    value: '10.90%',
    clickable: false
  },
  memUseRate: {
    label: '内存使用率',
    value: '2.91%',
    clickable: false
  },
  IOutilUseRate: {
    label: 'IOutil使用率',
    value: '2.91%',
    clickable: false
  },
  connectNum: {
    label: '连接数',
    value: 4,
    clickable: false
  }
})

const tab = ref('')
const performanceRef = ref()
const sourceRef = ref()
const netRef = ref()

const show = async () => {
  dialog.value.show()
  tab.value = 'performance'
  await nextTick() // 等待获取到Ref后才能执行下面的操作， 否则获取不到chost组件实例

  performanceRef.value.show()
}

const hidden = () => {
  dialog.value.hidden()
}

watch(() => tab.value, async (val) => {
  switch (val) {
    case 'performance':
      await nextTick()
      performanceRef.value.show()
      break
    case 'source':
      await nextTick()
      sourceRef.value.show()
      break
    case 'net':
      await nextTick()
      netRef.value.show()
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
  console.log(1293671)
  errorInfoRef.value.show()
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="NodeHost">
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
              <label class="text-aiops-primary cursor-pointer" @click="navigateToUrl(appPath + '/monitorUnit')" v-close-popup>查看详情</label>
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
            <q-tab name="performance" label="性能" />
            <q-tab name="source" label="资源" />
            <q-tab name="net" label="网络" />
          </q-tabs>

          <q-separator style="margin-top: -1px;" color="aiops-border" />

          <q-scroll-area style="height: 400px">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="performance" style="padding: 12px 0">
                <!-- 请求数，平均响应时间，系统平均负载 -->
                <performance-chart ref="performanceRef"></performance-chart>
              </q-tab-panel>

              <q-tab-panel name="source" style="padding: 12px 0">
                <!-- CPU使用率 内存信息 磁盘使用率 -->
                <source-chart ref="sourceRef"></source-chart>
              </q-tab-panel>

              <q-tab-panel name="net" style="padding: 12px 0">
                <!-- 每秒网络带宽使用 每分钟流量 网络socket连接信息 -->
                <net-chart ref="netRef"></net-chart>
              </q-tab-panel>
            </q-tab-panels>
          </q-scroll-area>
        </div>
      </template>

      <template #actions>
        <q-btn padding="4px 14px" outline style="color: #606266;" label="关闭" v-close-popup />      </template>
    </my-dialog>

    <error-info ref="errorInfoRef" :nodeParams="errorParams"></error-info>
  </div>
</template>

<style lang="scss" scoped>
.NodeHost {

}
</style>
