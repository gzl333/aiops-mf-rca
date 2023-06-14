<!-- 防火墙弹框 -->
<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import { navigateToUrl } from 'single-spa'

import MyDialog from 'components/common/MyDialog.vue'
import PerformanceChart from '../vpnTab/PerformanceChart.vue'
import PortChart from '../vpnTab/PortChart.vue'
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
const portRef = ref()

const show = async () => {
  if (tab.value) {
    tab.value = ''
    await nextTick()
  }
  dialog.value.show()

  nodeInfo.value.type = 'vpn'
  await store.getMetric()
  await store.getMetricWarning()

  tab.value = 'performance'
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
    systemID: currentBusiness.value.value,
    type: 'node',
    elementID: nodeInfo.value.ip,
    timeRange: [store.startTime, store.endTime],
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
  <div class="NodeVpn">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <!-- cpu使用率，端口，平均cpu使用率 -->
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
            <q-tab name="performance" label="性能" />
            <q-tab name="port" label="端口" />
          </q-tabs>

          <q-separator style="margin-top: -1px;" color="aiops-border" />

          <q-scroll-area style="height: 400px">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="performance" style="padding: 12px 0">
                <!-- cpu使用率 -->
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
.NodeVpn {

}
</style>
