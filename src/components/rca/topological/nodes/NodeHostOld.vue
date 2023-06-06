<!-- 主机弹框 -->
<script setup lang="ts">
import { ref, reactive, computed, withDefaults, onMounted, nextTick, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'
import { Chart } from '@antv/g2'

import MyDialog from 'components/common/MyDialog.vue'
import MyCtGauge from 'components/common/MyCtGauge.vue'

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
        width: 400,
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

const show = async () => {
  dialog.value.show()
  await nextTick() // 等待获取到Ref后才能执行下面的操作， 否则获取不到chost组件实例

  chost.value.show()
}

const hidden = () => {
  dialog.value.hidden()
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="NodeHost">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <template #container>
        <!-- 主机名 内网IP 外网IP 主机名 操作系统 系统内核 性能指标 日志 -->
        <!-- 健康值 -->
        <my-ct-gauge ref="chost" :params="cParams" :idName="`c${nodeInfo.deviceType}`"></my-ct-gauge>

        <!-- 启动天数 健康值 内存 负载 CPU使用率 内存使用率 IOutil使用率 分区使用率 磁盘读取 磁盘写入 连接数 TCP_tw -->
        <div class="bg-blue-grey-1 q-px-md q-mt-lg q-py-xs" style="border-radius: 6px">
          <div class="row items-center" style="line-height: 2;" v-for="item in fields" :key="item.label">
            <label style="width: 110px">{{ item.label }}</label>
            <p v-if="item.clickable" class="text-aiops-primary text-weight-medium cursor-pointer">{{ item.value }}</p>
            <p v-else class="text-weight-medium">{{ item.value }}</p>
          </div>
        </div>
      </template>

      <template #actions>
        <q-btn flat color="primary" label="关闭" v-close-popup />
        <q-btn unelevated color="aiops-primary" label="查看详情" to="/location/monitorUnit" v-close-popup />
      </template>
    </my-dialog>
  </div>
</template>

<style lang="scss" scoped>
</style>
