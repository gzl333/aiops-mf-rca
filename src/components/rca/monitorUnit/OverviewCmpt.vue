<!-- 监控单元信息 -->
<script setup lang="ts">
import { ref, watch, reactive, nextTick } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'
import MyCtGauge from 'components/common/MyCtGauge.vue'

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
  currentUnitType?: string
  unitData: any[]
  unitList?: UnitList[]
  queryParams?: QueryParams
}

const props = withDefaults(defineProps<Props>(), {
  currentUnitType: 'host',
  unitData: () => {
    return []
  },
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
const isShow = ref(false)
const overviewData = reactive([
  {
    type: 'info',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '操作系统',
        value: 'centos6.10_64bit'
      },
      {
        label: '系统内核',
        value: '2.6.32-754.el6'
      },
      {
        label: '启动天数',
        value: '24天'
      },
      {
        label: '健康值',
        value: '89%'
      },
      {
        label: '告警数',
        value: '4'
      }
    ]
  },
  {
    type: 'memory',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '内存',
        value: ''
      },
      {
        label: 'CPU',
        value: ''
      },
      {
        label: '负载',
        value: ''
      },
      {
        label: 'CPU使用率',
        value: ''
      },
      {
        label: '内存使用率',
        value: ''
      }
    ]
  },
  {
    type: 'disk',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '分区使用率',
        value: ''
      },
      {
        label: 'IOutil使用率',
        value: ''
      },
      {
        label: '磁盘读取',
        value: ''
      },
      {
        label: '磁盘写入',
        value: ''
      }
    ]
  },
  {
    type: 'socket',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '连接数',
        value: ''
      },
      {
        label: 'tcp_tw',
        value: ''
      },
      {
        label: '下载带宽',
        value: ''
      },
      {
        label: '上传带宽',
        value: ''
      }
    ]
  }
])

const show = async () => {
  isShow.value = true
}

const hidden = async () => {
  isShow.value = false
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="OverviewCmpt text-aiops-sub-font row">
    <!-- 操作系统，系统内核，启动天数，健康值，告警数，<br>
    内存，CPU，负载，CPU使用率，内存使用率，<br>
    分区使用率，IOutil使用率，磁盘读取，磁盘写入速率，<br>
    连接数，tcp_tw，下载带宽，上传带宽 -->
    <div class="chart-info col-3 row" v-for="(item, index) in unitData" :key="index">
      <div :id="`chart${item.type}`">
        <my-ct-gauge :ref="`${item.type}Ref`" :idName="`chart${item.type}`"></my-ct-gauge>
      </div>
      <div class="info q-ml-md">
        <div class="row q-mb-xs" v-for="(el, elIndex) in item.list" :key="elIndex">
          <label class="text-body2">{{ el.label }}：</label>
          <p class="text-body2 text-weight-medium">{{ el.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.OverviewCmpt {
  height: 150px;
  margin: 0 16px;
  padding: 10px 0;
  border-radius: 6px;
  background: rgb(239, 240, 244);
}
</style>
