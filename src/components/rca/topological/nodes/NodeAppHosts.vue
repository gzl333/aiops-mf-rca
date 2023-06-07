<!-- 主机弹框 -->
<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { appHost, appNginx, appTomcat } from '../topologicalCmptData/nodes'

import MyDialog from 'components/common/MyDialog.vue'
import PerformanceChart from '../hostTab/PerformanceChart.vue'
import SourceChart from '../hostTab/SourceChart.vue'
import NetChart from '../hostTab/NetChart.vue'
import ErrorInfo from '../ErrorInfo.vue'

const router = useRouter()
const useToRoute = (path: string) => {
  router.push({ path })
}

const store = useStore()
const { currentBusiness, nodeInfo } = storeToRefs(store)

const params = reactive({
  style: {
    width: 550,
    maxWidth: '70vw',
    maxHeight: '100vh'
  },
  info: {
    systemID: currentBusiness.value.value,
    type: 'node',
    elementID: nodeInfo.value.ip,
    timeRange: [store.timestampGte, store.timestampLte],
    title: '节点详情'
  }
})
const emits = defineEmits(['clearState'])

// 关闭弹框时执行的其他操作（清除拓扑图节点选中状态）
const clearState = () => {
  emits('clearState')
}

const dialog = ref()
const tab = ref('')
const tabOptions = ref([
  { label: '资源', value: 'source' },
  { label: '性能', value: 'performance' },
  { label: '网络', value: 'net' }
])
const performanceRef = ref()
const sourceRef = ref()
const netRef = ref()

const hostType = ref('') // 当前类型 host，nginx，tomcat
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
 * @desc: 监听当前选中主机，更改可选类型,请求ip数据 更改store中的选中节点信息,并更新tab列表，修改默认tab
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
    await store.getMetric()

    if (hostType.value !== 'host') {
      hostType.value = 'host'
    } else {
      tab.value = 'source'
    }
  }
})

watch(() => hostType.value, async (val, oldVal) => {
  tab.value = 'source'
})

watch(() => tab.value, async (val, oldVal) => {
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
    timeRange: [store.timestampGte, store.timestampLte],
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
        <div class="q-px-xs row" style="max-height: 100px; overflow: auto;">
          <div v-for="(item, index) in ipLists" :key="index" class="col-6 row items-center q-pb-xs cursor-pointer" @click="checkIP(item)">
            <q-icon name="fiber_manual_record" color="aiops-positive" style="font-size:4px; padding-right: 4px;"></q-icon>
            <div class="ipAddress font-size-14">{{ item.ip }}({{ item.label }})</div>
          </div>
        </div>

        <q-separator class="q-mt-sm" color="aiops-border" />
        <div class="q-px-xs q-my-sm ">
          <span class="text-bold">{{ currentHost.ip }}({{ currentHost.label }})：</span>
          <span class="text-aiops-primary cursor-pointer" @click="showError">告警</span>
          <span class="text-aiops-primary cursor-pointer q-pl-md" @click="useToRoute('/my/rca/monitorUnit')" v-close-popup>日志</span>
          <span class="text-aiops-primary cursor-pointer q-pl-md" @click="useToRoute('/my/rca/monitorUnit')" v-close-popup>详情</span>

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

        <div class="q-px-xs">
          <q-option-group
            v-model="tab"
            inline
            :options="tabOptions"
          />
          <!-- 现阶段主机，Tomcat，nginx的指标展示内容一致 -->
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
      </template>

      <template #actions>
        <q-btn padding="4px 14px" outline style="color: #606266;" label="关闭" v-close-popup />

        <!-- <q-btn outline padding="4px 14px" style="color: #606266;" label="关闭" v-close-popup /> -->
        <!-- <q-btn padding="4px 14px" unelevated color="aiops-primary" label="查看详情" to="/my/rca/monitorUnit" v-close-popup /> -->
      </template>
    </my-dialog>

    <error-info ref="errorInfoRef" :nodeParams="errorParams"></error-info>
  </div>
</template>

<style lang="scss" scoped>
.NodeAppHosts {

}
</style>