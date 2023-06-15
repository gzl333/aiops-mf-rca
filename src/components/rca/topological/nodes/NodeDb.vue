<!-- 操作系统弹框 -->
<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import { navigateToUrl } from 'single-spa'

import MyDialog from 'components/common/MyDialog.vue'
import PerformanceChart from '../dbTab/PerformanceChart.vue'
import SourceChart from '../dbTab/SourceChart.vue'
import NetChart from '../dbTab/NetChart.vue'
import ErrorInfo from '../ErrorInfo.vue'

const appPath = process.env.appPath as string
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
    ip: nodeInfo.value.ip,
    label: nodeInfo.value.label,
    timeRange: [store.startTime, store.endTime],
    title: '节点详情'
  }
})

const emits = defineEmits(['clearState'])

const clearState = () => {
  emits('clearState')
}

const dialog = ref()

const tab = ref('')
const performanceRef = ref()
const sourceRef = ref()
const netRef = ref()

const show = async () => {
  if (tab.value) {
    tab.value = ''
    await nextTick()
  }
  dialog.value.show()

  nodeInfo.value.type = 'db'
  await store.getMetric()
  await store.getMetricWarning()

  tab.value = 'source'
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
  <div class="NodeDb">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <template #container>
        <div class="q-px-xs q-my-sm ">
          <span class="text-bold">{{ nodeInfo.ip }}({{ nodeInfo.label }})：</span>
          <span class="text-aiops-primary cursor-pointer" @click="showError">告警</span>
          <span class="text-aiops-primary cursor-pointer q-pl-md" @click="navigateToUrl(appPath + '/monitorUnit')" v-close-popup>日志</span>
          <span class="text-aiops-primary cursor-pointer q-pl-md" @click="navigateToUrl(appPath + '/monitorUnit')" v-close-popup>详情</span>
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
            <q-tab name="source" label="资源" />
            <q-tab name="performance" label="性能" />
            <q-tab name="net" label="网络" />
          </q-tabs>

          <q-separator style="margin-top: -1px;" color="aiops-border" />

          <q-scroll-area style="height: 400px">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="performance" style="padding: 12px 0">
                <!--qps tps 系统负载 -->
                <performance-chart ref="performanceRef"></performance-chart>
              </q-tab-panel>

              <q-tab-panel name="source" style="padding: 12px 0">
                <!-- 所有CPU平均使用率 内存使用率  -->
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
        <q-btn padding="4px 14px" outline style="color: #606266;" label="关闭" v-close-popup />
      </template>
    </my-dialog>

    <error-info ref="errorInfoRef" :nodeParams="errorParams"></error-info>
  </div>
</template>

<style lang="scss" scoped>
.NodeDb {
}
</style>
