<!-- 防火墙弹框 -->
<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'
import { navigateToUrl } from 'single-spa'

import MyDialog from 'components/common/MyDialog.vue'
import SourceChart from '../firewallTab/SourceChart.vue'
import PortChart from '../firewallTab/PortChart.vue'
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

const tab = ref('source')
const sourceRef = ref()
const portRef = ref()

const show = async () => {
  if (tab.value) {
    tab.value = ''
    await nextTick()
  }
  dialog.value.show()

  nodeInfo.value.type = 'firewall'
  await store.getMetric()
  await store.getMetricWarning()

  tab.value = 'source'
}

const hidden = () => {
  dialog.value.hidden()
}

watch(() => tab.value, async (val) => {
  switch (val) {
    case 'source':
      await nextTick()
      sourceRef.value.show()
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
  errorInfoRef.value.show()
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="NodeSwitch">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <!-- cpu使用率，端口，平均cpu使用率 -->
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
            <q-tab name="source" label="性能" />
            <q-tab name="port" label="端口" />
          </q-tabs>

          <q-separator style="margin-top: -1px;" color="aiops-border" />

          <q-scroll-area style="height: 400px">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="source" style="padding: 12px 0">
                <!-- cpu使用率 -->
                <source-chart ref="sourceRef"></source-chart>
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
.NodeSwitch {

}
</style>
