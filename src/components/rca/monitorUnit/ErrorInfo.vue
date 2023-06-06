<!-- 告警信息 -->
<script setup lang="ts">
import { ref, watch, reactive, nextTick } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'

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
interface UnitList {
  id: string
  ip: string
  name: string
  [propName: string]: any
}

interface Options {
  label: string
  value: string
}

interface QueryParams {
  business: Options
  unit: Options
  timeRange: [string, string]
}

interface Props {
  currentUnitType: string
  unitList: UnitList[]
  queryParams: QueryParams
}

const props = withDefaults(defineProps<Props>(), {
  currentUnitType: 'host',
  unitList: () => {
    return [
      {
        id: '00001',
        ip: '192.168.0.177',
        name: 'APP16'
      }
    ]
  },
  queryParams: () => {
    return {
      business: {
        label: '',
        value: ''
      },
      unit: {
        label: '',
        value: ''
      },
      timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { day: 1 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')]
    }
  }
})

const columns = reactive([
  {
    name: 'index',
    label: '序号',
    align: 'left',
    field: 'index'
  },
  {
    name: 'name',
    required: true,
    label: '告警名称',
    align: 'left',
    field: 'name',
    sortable: false
  },
  {
    name: 'time',
    required: true,
    label: '触发时间',
    align: 'left',
    field: row => row.time,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'type', align: 'left', label: '告警类型', field: 'type', sortable: false },
  { name: 'rule', align: 'left', label: '告警规则', field: 'rule', sortable: false },
  { name: 'level', align: 'left', label: '告警级别', field: 'level', sortable: false },
  { name: 'state', align: 'left', label: '处理状态', field: 'state', sortable: false }

  // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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

</script>

<template>
  <div class="LogInfo text-aiops-sub-font row">
    <q-table
      class="my-sticky-column-table"
      flat
      bordered
      :rows="rows"
      :table-header-style="{ backgroundColor: 'rgb(239, 240, 244)' }"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
      :pagination="{ rowsPerPage: 10 }"
      row-key="id"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" auto-width>
            {{ props.row.index }}
          </q-td>
          <q-td key="name" auto-width>
            {{ props.row.name }}
          </q-td>
          <q-td key="time" auto-width>
            {{ props.row.time }}
          </q-td>
          <q-td key="type" auto-width>
            {{ props.row.type }}
          </q-td>
          <q-td key="rule" auto-width>
            {{ props.row.rule }}
          </q-td>
          <q-td key="level" auto-width>
            {{ props.row.level }}
          </q-td>
          <q-td key="state" auto-width>
            {{ props.row.state }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </div>
</template>

<style lang="scss" scoped>
.LogInfo{
  .inline {
    display: inline-block;
  }
  .my-sticky-column-table{
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
}
</style>
