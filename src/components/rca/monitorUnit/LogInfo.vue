<!-- 日志信息 -->
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
  timeRange: string[]
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
    required: true,
    align: 'left',
    field: 'index'
  },
  {
    name: 'time',
    required: true,
    label: '时间戳',
    align: 'left',
    field: row => row.time,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'logType', align: 'left', label: '日志类型', field: 'logType', sortable: true },
  {
    name: 'info',
    align: 'left',
    label: '日志信息',
    field: 'info',
    sortable: false
  }
  // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rows = reactive([
  {
    time: '2023-04-10 09:30:42',
    logType: 'access',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '2023-03-10T01:30:36.068865Z 539948 [Note] Got an error reading communication packets'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  },
  {
    time: '2023-04-10 09:30:42',
    logType: 'error',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '2023-03-10T01:30:36.068865Z 539948 [Note] Got an error reading communication packets'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  },
  {
    time: '2023-04-10 09:30:42',
    logType: 'access',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '  "192.168.240.10 - - [27/Mar/2023:23:56:49 +0800]  GET /images/@kibana-highlighted-field@err@/kibana-highlighted-field@.png HTTP/1.1  404 393  -   Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11 108.93.87.83, 124.70.89.241 0.000 0.001"'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  },
  {
    time: '2023-04-10 09:30:42',
    logType: 'error',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '2023-03-10T01:30:36.068865Z 539948 [Note] Got an error reading communication packets'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  },
  {
    time: '2023-04-10 09:30:42',
    logType: 'access',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '2023-03-10T01:30:36.068865Z 539948 [Note] Got an error reading communication packets'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  },
  {
    time: '2023-04-10 09:30:42',
    logType: 'access',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '2023-03-10T01:30:36.068865Z 539948 [Note] Got an error reading communication packets'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  },
  {
    time: '2023-04-10 09:30:42',
    logType: 'access',
    info: {
      '@timestamp': [
        '2023-03-10T01:30:42.293Z'
      ],
      '@version': [
        '1'
      ],
      '@version.keyword': [
        '1'
      ],
      'agent.ephemeral_id': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.ephemeral_id.keyword': [
        '2bda741f-24f3-4206-bbdb-37dd8f6ec1f8'
      ],
      'agent.hostname': [
        'MySQLSalve'
      ],
      'agent.hostname.keyword': [
        'MySQLSalve'
      ],
      'agent.id': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.id.keyword': [
        'bbc21242-aff0-4d39-a243-a4df2839f64c'
      ],
      'agent.name': [
        'MySQLSalve'
      ],
      'agent.name.keyword': [
        'MySQLSalve'
      ],
      'agent.type': [
        'filebeat'
      ],
      'agent.type.keyword': [
        'filebeat'
      ],
      'agent.version': [
        '7.9.3'
      ],
      'agent.version.keyword': [
        '7.9.3'
      ],
      'ecs.version': [
        '1.5.0'
      ],
      'ecs.version.keyword': [
        '1.5.0'
      ],
      'fields.log_source': [
        'MySQLSalve.err'
      ],
      'fields.log_source.keyword': [
        'MySQLSalve.err'
      ],
      'host.name': [
        'MySQLSalve'
      ],
      'host.name.keyword': [
        'MySQLSalve'
      ],
      'input.type': [
        'log'
      ],
      'input.type.keyword': [
        'log'
      ],
      'log.file.path': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.file.path.keyword': [
        '/home/coremail/var/mysql/MySQLSalve.err'
      ],
      'log.offset': [
        19763193
      ],
      message: [
        '2023-03-10T01:30:36.068865Z 539948 [Note] Got an error reading communication packets'
      ],
      _id: 'LqkkyYYBFZpIWJgLWx7O',
      _index: 'mail_mysqlsalve.err.log-2023.03',
      _score: null
    }
  }
])

rows.forEach((row, index) => {
  row.index = index + 1
})

const logType = ref('error')
const logOps = reactive([
  {
    label: 'error',
    value: 'error'
  },
  {
    label: 'access',
    value: 'access'
  }
])

const changeLogType = (val: any) => {
  console.log(val)
}
</script>

<template>
  <div class="LogInfo text-aiops-sub-font">
    <div class="row justify-end q-pb-sm">
      <label class="q-pr-sm q-pt-sm q-ml-md" for="monitor">日志类型</label>
      <q-select
          style="width: 240px"
          outlined
          v-model="logType"
          :dense="true"
          :options="logOps"
          :option-value="item => item.value"
          :option-label="item => item.label"
          @update:model-value="changeLogType"
        >
      </q-select>
    </div>

    <q-table
      class="my-sticky-column-table"
      flat
      bordered
      :rows="rows"
      :table-header-style="{ backgroundColor: 'rgb(239, 240, 244)' }"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" auto-width>
            {{ props.row.index }}
          </q-td>
          <q-td key="time" auto-width>
            {{ props.row.time }}
          </q-td>
          <q-td key="type" auto-width>
            <q-chip v-show="props.row.logType === 'error'" square dense color="aiops-negative" text-color="white" :label="props.row.logType" />
            <q-chip v-show="props.row.logType !== 'error'" square dense :label="props.row.logType" />
          </q-td>
          <q-td key="info" style="max-width: 500px; white-space: pre-wrap;">
            <div class="row wrap">
              <div
                v-for="(value, key, index) in props.row.info"
                :key="index"
                :class="[
                  {'col-6': key !== 'message'},
                  {'ellipsis': key !== 'message'},
                  {'bg-aiops-hover-primary': key === 'message'},
                  {'col-12': key === 'message'},
                  'q-pr-sm'
                ]"
              >
                {{ key }}: {{ value }}
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </div>
</template>

<style lang="scss" scoped>
.LogInfo{

  .block {
    display: block;
  }
  .my-sticky-column-table{
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
    max-width: 1456px;
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
