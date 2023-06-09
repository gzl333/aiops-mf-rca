<!-- 告警信息弹框 -->
<script setup lang="ts">
import { ref, reactive, computed, withDefaults, onMounted, nextTick, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'

import MyDialog from 'components/common/MyDialog.vue'

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
  nodeParams?: NodeParams
  currentSelect?: any
}

const props = withDefaults(defineProps<Props>(), {
  nodeParams: () => {
    return {
      style: {
        width: 700,
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
    }
  }
})

const emits = defineEmits(['clearState'])

const nodeInfo = computed(() => props.currentSelect._cfg.model)
const clearState = () => {
  emits('clearState')
}

const dialog = ref()
const errorContent = ref('[2023-01-17 13:30:18][网元名称][严重][链路断开][告警名称: xxxxx][定位信息：xxxxxxxxxxxxxxxx][告警规则：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]')

const show = async () => {
  dialog.value.show()
}

const hidden = () => {
  dialog.value.hidden()
}

const columns = reactive([
  // {
  //   name: 'index',
  //   label: '序号',
  //   align: 'left',
  //   field: 'index'
  // },
  {
    name: 'name',
    required: true,
    label: '告警名称',
    align: 'left',
    field: 'name',
    sortable: false
  },
  // {
  //   name: 'time',
  //   required: true,
  //   label: '触发时间',
  //   align: 'left',
  //   field: row => row.time,
  //   format: val => `${val}`,
  //   sortable: true
  // },
  { name: 'type', align: 'left', label: '告警类型', field: 'type', sortable: false },
  // { name: 'rule', align: 'left', label: '告警规则', field: 'rule', sortable: false },
  { name: 'level', align: 'left', label: '告警级别', field: 'level', sortable: false }
  // { name: 'state', align: 'left', label: '处理状态', field: 'state', sortable: false }
])

const rows = reactive([
  {
    id: '00001',
    name: 'user-serivce提供请求延时过高',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '严重',
    state: '待处理'
  },
  {
    id: '00002',
    name: 'user-service提供请求成功率下跌',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '严重',
    state: '待处理'
  },
  {
    id: '00003',
    name: 'user-service提供请求成功率下跌',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '严重',
    state: '待处理'
  },
  {
    id: '00004',
    name: 'user-service提供请求成功率下跌',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '一般',
    state: '待处理'
  },
  {
    id: '00005',
    name: 'user-service提供请求成功率下跌',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '一般',
    state: '待处理'
  },
  {
    id: '00006',
    name: 'user-service提供请求成功率下跌',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '严重',
    state: '已完成'
  },
  {
    id: '00007',
    name: 'user-service提供请求成功率下跌',
    time: '2023-04-10 09:30:42',
    type: '应用监控报警',
    rule: '最近3分钟应用提供服务调用响应时间_ms大于等于500',
    level: '严重',
    state: '处理中'
  }
])

rows.forEach((row, index) => {
  row.index = index + 1
})

const stepList = reactive([
  {
    time: '2023-04-10 09:30:42',
    title: '触发告警',
    icon: 'las la-exclamation',
    color: '#FC5531',
    step: 'start',
    intro: ''
  },
  {
    time: '2023-04-10 09:31:42',
    title: '任务指派',
    icon: 'las la-user',
    color: '#0090FF',
    step: 'assign',
    intro: '',
    user: '@admin'
  },
  {
    time: '2023-04-10 13:30:42',
    title: '告警处理',
    icon: 'las la-tools',
    color: '#0090FF',
    step: 'handle',
    intro: '@admin 处理中'
  },
  {
    time: '2023-04-10 14:30:42',
    title: '处理完成',
    icon: 'done',
    color: '#21BA45',
    step: 'end',
    intro: '@admin 处理完成，人工修复，告警关闭'
  }
])
defineExpose({ show, hidden })
</script>

<template>
  <div class="ErrorInfo">
    <my-dialog ref="dialog" :nodeParams="nodeParams" @clearState="clearState">
      <template #container>
        <div class="row">
          <div class="list col-6 q-pr-lg">
            <p class="subtitle">
              <i class="lar la-circle text-aiops-primary"></i>
              告警列表
            </p>

            <q-table
              class="my-sticky-column-table"
              flat
              :rows="rows"
              :columns="columns"
              :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
              :pagination="{ rowsPerPage: 10 }"
              row-key="id"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <!-- <q-td key="index" auto-width>
                    {{ props.row.index }}
                  </q-td> -->
                  <q-td key="name" auto-width>
                    {{ props.row.name }}
                  </q-td>
                  <!-- <q-td key="time" auto-width>
                    {{ props.row.time }}
                  </q-td> -->
                  <q-td key="type" auto-width>
                    {{ props.row.type }}
                  </q-td>
                  <!-- <q-td key="rule" auto-width>
                    {{ props.row.rule }}
                  </q-td> -->
                  <q-td key="level" auto-width>
                    {{ props.row.level }}
                  </q-td>
                  <!-- <q-td key="state" auto-width>
                    {{ props.row.state }}
                  </q-td> -->
                </q-tr>
              </template>
            </q-table>
          </div>

          <div class="col-6">
            <p class="subtitle">
              <i class="lar la-circle text-aiops-primary"></i>
              告警详情
            </p>
            <div class="row q-my-md">
              <div class="row col-6">
                <q-icon name="access_time" class="color-primary text-h4"></q-icon>
                <div class="q-ml-sm">
                  <p class="label">触发时间</p>
                  <span class="data">2023-04-10 09:30:42</span>
                </div>
              </div>

              <div class="row col-6 q-px-md">
                <q-icon name="handyman" class="color-primary text-h4"></q-icon>
                <div class="q-ml-sm">
                  <p class="label">处理状态</p>
                  <span class="data">已关闭</span>
                </div>
              </div>
            </div>

            <p class="subtitle">
              <i class="lar la-circle text-aiops-primary"></i>
              告警内容
            </p>

            <q-input
              class="q-mt-sm"
              readonly
              v-model="errorContent"
              filled
              type="textarea"
            />

            <p class="subtitle q-mt-md">
              <i class="lar la-circle text-aiops-primary"></i>
              状态流转
            </p>

            <q-scroll-area style="height: 240px">
              <div class="state-step">
                <div class="row" v-for="(item, index) in stepList.slice().reverse()" :key="index">
                  <div class="q-pr-sm column ">
                    <q-icon :name="item.icon" class="step-icon" :style="{backgroundColor: item.color}"></q-icon>
                    <q-separator v-show="index !== stepList.length - 1" style="flex-grow: 1; " class="separator" vertical />
                  </div>

                  <div class="info" style="flex: 1">
                    <p class="time">{{ item.time }}</p>
                    <div class="row items-center">
                      <p class="title q-mr-sm">{{ item.title }}</p>
                      <p class="intro">{{ item.intro }}</p>
                      <p class="user" v-show="item.user">{{ item.user }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </q-scroll-area>
          </div>
        </div>
      </template>

      <template #actions>
        <q-btn padding="4px 14px" outline style="color: #606266;" label="关闭" v-close-popup />

        <!-- <q-btn outline padding="4px 14px" style="color: #606266;" label="关闭" v-close-popup /> -->
        <!-- <q-btn padding="4px 14px" unelevated color="aiops-primary" label="查看详情" to="/my/rca/mailSystem" v-close-popup /> -->
      </template>
    </my-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .my-sticky-column-table {
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
    width: 100%;
    max-height: 600px;

    :deep(thead tr th){
      position: sticky;
      z-index: 1
    }

    :deep(thead tr:first-child th){
      top: 0
    }
  }

  .subtitle {
    font-size: 14px;
    font-weight: 600;
  }

  .label {
    font-size: 14px;
  }

  .data {
    font-size: 16px;
  }

  .state-step {
    margin-top: 8px;

    .step {
      position: relative;
      padding-right: 4px;
      height: 100%;
    }

    .step-icon {
      background-color: $aiops-positive;
      color: #fff;
      border-radius: 50%;
      padding: 3px;
    }

    .separator {
      margin: auto;
      // margin-top: 6px;
    }

    .info {
      margin-bottom: 10px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #f5f5f5;
      // background: rgb(239, 240, 244);

      .time {
        color: #BBBBBB;
        font-size: 13px;
      }

      .title {
        font-size: 13px;
        font-weight: bold;
      }

      .intro {
        font-size: 13px;
      }

      .user {
        font-size: 13px;
        color: #fff;
        background: #83cafb;
        border-radius: 3px;
        padding: 0 3px;
      }
    }
  }
</style>
