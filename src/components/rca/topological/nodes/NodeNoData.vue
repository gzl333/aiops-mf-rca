<!-- 节点类型暂无信息弹框 -->
<script setup lang="ts">
import { ref, reactive, computed, withDefaults, onMounted, nextTick, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'
import { navigateToUrl } from 'single-spa'

import MyDialog from 'components/common/MyDialog.vue'
import PerformanceChart from '../vpnTab/PerformanceChart.vue'
import PortChart from '../vpnTab/PortChart.vue'
import MyNoData from 'components/common/MyNoData.vue'
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

const show = async () => {
  dialog.value.show()
}

const hidden = () => {
  dialog.value.hidden()
}

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
  <div class="NodeNoData">
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

        <div class="q-px-xs row justify-center transform-no-data">
          <my-no-data :width="300" tips="暂无此节点监控信息"></my-no-data>
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
@import "~css/mixins.scss";

.NodeNoData {

  .transform-no-data {
    @include transform(translate(0, 40%))
  }

}
</style>
