<!-- 主机弹框 -->
<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import { QTableProps, date } from 'quasar'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import { navigateToUrl } from 'single-spa'
import { appHost, appNginx, appTomcat } from '../topologicalCmptData/nodes'
import api from 'src/api'
import MyDialog from 'components/common/MyDialog.vue'
import PerformanceChart from '../hostTab/PerformanceChart.vue'
import SourceChart from '../hostTab/SourceChart.vue'
import NetChart from '../hostTab/NetChart.vue'
import ErrorInfo from '../ErrorInfo.vue'

const appPath = process.env.appPath as string
const store = useStore()
const { currentBusiness, nodeInfo } = storeToRefs(store)

const params = reactive({
  style: {
    width: 650,
    maxWidth: '70vw',
    maxHeight: '100vh'
  },
  info: {
    systemID: currentBusiness.value.value,
    type: 'node',
    elementID: nodeInfo.value.ip,
    timeRange: [store.startTime, store.endTime],
    title: '节点详情'
  }
})
const emits = defineEmits(['clearState'])

// 关闭弹框时执行的其他操作（清除拓扑图节点选中状态）
const clearState = () => {
  emits('clearState')
}

const dialog = ref()
const tab = ref<string>('')
const tabOptions = ref([
  { label: '资源', value: 'source' },
  { label: '性能', value: 'performance' },
  { label: '网络', value: 'net' }
])
const performanceRef = ref()
const sourceRef = ref()
const netRef = ref()

const hostType = ref<string>('') // 当前类型 host，nginx，tomcat
const hostOptions = ref([
  {
    label: '主机',
    value: 'host'
  }
])

interface HostInfo {
  ip: string
  label: string
  hostState: string
  nginxState?: string
  tomcatState?: string
}
const ipLists = ref<HostInfo[]>([])

// 为ip增加每个单元类型（host,nginx,tomcat）的运行状态state
appHost.forEach((item, index) => {
  ipLists.value.push({
    ip: item.ip,
    label: item.label,
    hostState: item.state
  })
  appNginx.forEach((ngItem) => {
    if (ngItem.ip === ipLists.value[index].ip) {
      ipLists.value[index].nginxState = item.state
    }
  })

  appTomcat.forEach((tomItem) => {
    if (tomItem.ip === ipLists.value[index].ip) {
      ipLists.value[index].tomcatState = item.state
    }
  })
})

// 点击某个ip选中项
const currentHost = ref<HostInfo>({
  ip: '',
  label: '',
  hostState: ''
})

interface LogInfo {
  index?: number
  time?: string
  log_source?: string
  logType?:string
  text?: string
  [propName: string]: any
}
const nginxRows = ref<LogInfo[]>([])
const nginxLoading = ref<boolean>(true)
const tomcatRows = ref<LogInfo[]>([])
const tomcatLoading = ref<boolean>(true)
const initialPagination = ref({
  rowsPerPage: 10
})
const columns = ref<QTableProps['columns']>([
  {
    name: 'index',
    label: '序号',
    required: true,
    align: 'left',
    field: 'index'
  },
  {
    name: 'time',
    required: true,
    label: '时间',
    align: 'left',
    field: row => row.time,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'log_source',
    required: true,
    label: '日志源',
    align: 'left',
    field: row => row.log_source,
    format: val => `${val}`
  },
  {
    name: 'logType',
    align: 'left',
    label: '日志类型',
    field: 'logType',
    format: val => '-'
  },
  {
    name: 'text',
    align: 'left',
    label: '日志信息',
    field: 'text',
    sortable: false
  }
])

/**
 * @desc: 获取日志数据
 * @return {*}
 */
const getMailLog = async (ip: string, source: string, type: string) => {
  try {
    switch (type) {
      case 'nginx':
        nginxRows.value = []
        nginxLoading.value = true
        break
      case 'tomcat':
        tomcatRows.value = []
        tomcatLoading.value = true
        break
      default:
        break
    }
    const { results } = await api.mail.getMailLog({
      query: {
        timestamp__gte: store.timestampGte * 1000000000,
        timestamp__lte: store.timestampLte * 1000000000,
        instance: ip,
        log_source: source,
        page: 1,
        page_size: 10
      }
    })
    results.length && results.forEach((item, index) => {
      item.index = index + 1
      item.time = date.formatDate(Math.round(item.timestamp / 1000000), 'YYYY-MM-DD HH:mm:ss')
      item.logType = '-'
    })
    switch (type) {
      case 'nginx':
        nginxRows.value = results
        nginxLoading.value = false
        break
      case 'tomcat':
        tomcatRows.value = results
        tomcatLoading.value = false
        break
      default:
        break
    }
  } catch (error) {
    console.log(error)
  }
}

const currentSource = ref<string>('') // 当前节点log_source值

/**
 * @desc: 获取节点信息，拿到log_source值，为获取日志接口提供参数
 * @return {*}
 */
const getMailMachine = async (ip:string, type: string) => {
  currentSource.value = ''
  try {
    const { results } = await api.mail.getMailMachine({
      query: {
        instance: ip,
        category: type
      }
    })
    currentSource.value = results[0].log_source
    console.log('getMailMachine:', results)
  } catch (error) {
    console.log(error)
  }
}

/**
 * @desc: 点击切换ip
 * @param {*} item
 * @return {*}
 */
const checkIP = (item: HostInfo) => {
  currentHost.value = item
}

/**
 * @desc: 显示弹框
 * @return {*}
 */
const show = async () => {
  dialog.value.show()
  if (currentHost.value.ip) {
    currentHost.value = {
      ip: '',
      label: '',
      hostState: ''
    }
    await nextTick()
  }
  currentHost.value = ipLists.value[0]
}

/**
 * @desc: 关闭弹框
 * @return {*}
 */
const hidden = () => {
  dialog.value.hidden()
  hostType.value = ''
  tab.value = ''
  currentHost.value = {
    ip: '',
    label: '',
    hostState: ''
  }
}

/**
 * @desc: 监听当前选中主机，更改可选类型,请求ip数据
 * 更改store中的选中节点信息,并更新tab列表，修改默认tab
 * @return {*}
 */
watch(() => currentHost.value, async (val) => {
  if (val.ip) {
    tab.value = ''
    await nextTick()

    hostOptions.value = [
      {
        label: '主机',
        value: 'host'
      }
    ]

    if (val.nginxState) {
      hostOptions.value.push({
        label: 'nginx',
        value: 'nginx'
      })
    }
    if (val.tomcatState) {
      hostOptions.value.push({
        label: 'tomcat',
        value: 'tomcat'
      })
    }

    nodeInfo.value.ip = val.ip
    // 变更当前ip,获取实例指标值及预警线
    await store.getMetric()
    await store.getMetricWarning()

    // 重置tab
    if (hostType.value !== 'host') {
      hostType.value = 'host'
    } else {
      tab.value = 'source'
    }
  }
})

/**
 * @desc: 监听选中的实例类型，主机则重置tab, nginx和tomcat则获取日志
 * @return {*}
 */
watch(() => hostType.value, async (val) => {
  switch (val) {
    case 'host':
      tab.value = ''
      await nextTick()
      tab.value = 'source'
      break
    case 'nginx':
      // 加await将两个请求方法变为同步，这样可按顺序获取实例返回值log_source（请求1）更新currentSource.value，
      // currentSource.value最新值作为参数请求日志（请求2）
      await getMailMachine(currentHost.value.ip, 'nginx')
      getMailLog(currentHost.value.ip, currentSource.value, 'nginx')
      break
    case 'tomcat':
      await getMailMachine(currentHost.value.ip, 'tomcat')
      getMailLog(currentHost.value.ip, currentSource.value, 'tomcat')
      break
    default:
      break
  }
})

/**
 * @desc: 监听主机内tab变化，控制组件渲染
 * @return {*}
 */
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
    systemID: currentBusiness.value.value,
    type: 'node',
    elementID: nodeInfo.value.ip,
    timeRange: [store.startTime, store.endTime],
    title: '告警信息'
  }
})

const showError = () => {
  errorInfoRef.value.show()
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="NodeAppHosts">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <template #container>
        <p class="text-bold">子节点：</p>
        <div class="q-px-xs row" style="max-height: 120px; overflow: auto;">
          <div v-for="(item, index) in ipLists" :key="index" class="col-6 row items-center q-pb-xs cursor-pointer" @click="checkIP(item)">
            <q-icon name="fiber_manual_record" color="aiops-positive" style="font-size:4px; padding-right: 4px;"></q-icon>
            <div class="ipAddress font-size-14">{{ item.ip }}({{ item.label }})</div>
          </div>
        </div>

        <q-separator class="q-mt-sm" color="aiops-border" />

        <div class="q-px-xs q-my-sm ">
          <span class="text-bold">{{ currentHost.ip }}({{ currentHost.label }})：</span>
          <span class="text-aiops-primary cursor-pointer" @click="showError">告警</span>
          <span class="text-aiops-primary cursor-pointer q-pl-md" @click="navigateToUrl(appPath + '/monitorUnit')" v-close-popup>日志</span>
          <span class="text-aiops-primary cursor-pointer q-pl-md" @click="navigateToUrl(appPath + '/monitorUnit')" v-close-popup>详情</span>
        </div>

        <q-btn-toggle
          v-model="hostType"
          unelevated
          spread
          color="aiops-hover-primary"
          text-color="black"
          toggle-color="aiops-primary"
          :options="hostOptions"
        />

        <!-- 主机展示时序信息，Tomcat，nginx展示日志 -->
        <div class="q-px-xs" v-if="hostType === 'host'">
          <q-option-group
            v-model="tab"
            inline
            :options="tabOptions"
          />
          <q-scroll-area style="height: 400px">
            <q-tab-panels v-model="tab">

              <q-tab-panel name="source" style="padding: 12px 0">
                <!-- 资源： CPU使用率 内存信息 磁盘使用率 -->
                <source-chart ref="sourceRef"></source-chart>
              </q-tab-panel>

              <q-tab-panel name="performance" style="padding: 12px 0">
                <!-- 性能： 请求数，平均响应时间，系统平均负载 -->
                <performance-chart ref="performanceRef"></performance-chart>
              </q-tab-panel>

              <q-tab-panel name="net" style="padding: 12px 0">
                <!-- 网络： 每秒网络带宽使用 每分钟流量 网络socket连接信息 -->
                <net-chart ref="netRef"></net-chart>
              </q-tab-panel>

            </q-tab-panels>
          </q-scroll-area>
        </div>

        <div class="q-px-xs" v-if="hostType === 'nginx'">
          <q-scroll-area style="height: 400px">
            <q-table
              class="my-sticky-header-table q-mt-sm"
              row-key="name"
              hide-bottom
              flat
              bordered
              no-data-label="暂无数据"
              :loading="nginxLoading"
              :rows="nginxRows"
              :table-header-style="{ backgroundColor: 'rgb(239, 240, 244)' }"
              :columns="columns"
              :pagination="initialPagination"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="index" auto-width>
                    {{ props.row.index }}
                  </q-td>
                  <q-td key="time" style="width: 100px; white-space: pre-wrap;">
                    {{ props.row.time }}
                  </q-td>
                  <q-td key="log_source" auto-width>
                    {{ props.row.log_source }}
                  </q-td>
                  <q-td key="logType" auto-width>
                    {{ props.row.logType }}
                    <!-- <q-chip v-show="props.row.logType === 'error'" square dense color="aiops-negative" text-color="white" :label="props.row.logType" />
                    <q-chip v-show="props.row.logType !== 'error'" square dense :label="props.row.logType" /> -->
                  </q-td>
                  <q-td key="text" style="max-width: 100px; white-space: pre-wrap;">
                    <div class="row wrap">
                      {{ props.row.text }}
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>

            <span class="float-right text-aiops-primary cursor-pointer q-pl-md" @click="navigateToUrl(appPath + '/monitorUnit')" v-close-popup>更多日志</span>

          </q-scroll-area>
        </div>
        <div class="q-px-xs" v-if="hostType === 'tomcat'">
          <q-scroll-area style="height: 400px">
            <q-table
              class="my-sticky-header-table q-mt-sm"
              row-key="name"
              hide-bottom
              flat
              bordered
              no-data-label="暂无数据"
              :loading="tomcatLoading"
              :rows="tomcatRows"
              :table-header-style="{ backgroundColor: 'rgb(239, 240, 244)' }"
              :columns="columns"
              :pagination="initialPagination"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="index" auto-width>
                    {{ props.row.index }}
                  </q-td>
                  <q-td key="time" style="width: 50px; white-space: pre-wrap;">
                    {{ props.row.time }}
                  </q-td>
                  <q-td key="log_source" auto-width>
                    {{ props.row.log_source }}
                  </q-td>
                  <q-td key="logType" auto-width>
                    {{ props.row.logType }}
                    <!-- <q-chip v-show="props.row.logType === 'error'" square dense color="aiops-negative" text-color="white" :label="props.row.logType" />
                    <q-chip v-show="props.row.logType !== 'error'" square dense :label="props.row.logType" /> -->
                  </q-td>
                  <q-td key="text" style="width: 100px; white-space: pre-wrap;">
                    <div class="row wrap">
                      {{ props.row.text }}
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
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
.NodeAppHosts {

  .my-sticky-header-table {
    max-height: 300px;
    height: 300px;

    :deep(thead tr th){
      position: sticky;
      z-index: 1
    }

    :deep(thead tr:first-child th){
      top: 0
    }
  }
}
</style>
