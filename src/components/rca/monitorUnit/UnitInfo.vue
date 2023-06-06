<!-- 监控单元信息 -->
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'
import $bus from 'src/hooks/bus'
// import TimeSeries from './TimeSeries.vue'
import TimeSeriesChart from './TimeSeriesChart.vue'
import OverviewCmpt from './OverviewCmpt.vue'
import LogInfo from './LogInfo.vue'
import ErrorInfo from './ErrorInfo.vue'
import MyNoData from 'components/common/MyNoData.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
const emits = defineEmits(['getMetric'])

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
  chartData: Record<string, any>
  unitData: any[]
  unitList: UnitList[]
  queryParams: QueryParams
}

const props = withDefaults(defineProps<Props>(), {
  currentUnitType: 'host',
  chartData: () => {
    return {}
  },
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
      timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')]
    }
  }
})
const active = ref()
const queryText = ref()
const overviewRef = ref()
const tab = ref('chart')
const timeSeries = ref()
watch(() => active.value, async (val) => {
  if (tab.value === 'chart') {
    if (timeSeries.value) {
      timeSeries.value.hidden()
    }
    await nextTick()
    timeSeries.value.show()
  } else {
    tab.value = 'chart'
  }

  if (overviewRef.value) {
    overviewRef.value.hidden()
  }
  await nextTick()
  overviewRef.value.show()
})
watch(() => tab.value, async (val) => {
  // if (timeSeries.value) {
  //   timeSeries.value.hidden()
  // }
  switch (val) {
    case 'chart':
      await nextTick()
      timeSeries.value.show()
      break
    case 'log':
      break
    case 'error':
      break
    default:
      break
  }
})
const getDetail = async (instance: string) => {
  active.value = instance
  emits('getMetric', instance)
}
const changeTab = (val: string) => {
  if (val === 'chart') {
    $bus.emit('refreshChart', true)
  }
}
</script>

<template>
  <div class="UnitInfo text-aiops-sub-font text-body2 row">
    <div class="search">
      <q-input
        class="q-my-sm"
        input-class="cursor-pointer"
        filled
        v-model="queryText"
        :dense="true"
        label="请输入查询的内容"
      >
        <template #append>
          <q-icon name="lab la-sistrix" class="cursor-pointer"></q-icon>
        </template>
      </q-input>

      <q-scroll-area style="height: calc(100% - 65px)">
        <q-list>
          <q-item
            :class="{'bg-blue-1': active === item.instance}"
            style="min-height: 42px;"
            v-for="(item, index) in unitList"
            :key="index"
            :clickable="active !== item.instance"
            v-ripple
            :active="active === item.instance"
            @click="getDetail(item.instance)"
          >
            <q-item-section>
              {{ item.instance}}&nbsp;({{ item.alias }})
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>

    <!-- 监控单元信息 -->
    <div v-if="active" class="info q-pt-sm q-pl-sm" style="flex: 1">
      <!-- 数据总览 -->
      <overview-cmpt ref="overviewRef" :unit-data="props.unitData"></overview-cmpt>

      <!-- 详细数据 -->
      <q-tabs
        class="q-mt-sm"
        v-model="tab"
        dense
        active-color="aiops-primary"
        indicator-color="aiops-primary"
        align="left"
        narrow-indicator
        @update:model-value="changeTab"
      >
        <q-tab name="chart" label="时序信息" />
        <q-tab name="log" label="日志信息" />
        <q-tab name="error" label="告警信息" />
      </q-tabs>

      <q-scroll-area style="height: calc(100% - 195px)">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="chart">
            <!-- <time-series ref="timeSeries" :activeId="active"></time-series> -->

            <time-series-chart ref="timeSeries" :activeId="active" :type="props.currentUnitType" :data="props.chartData"></time-series-chart>
          </q-tab-panel>

          <q-tab-panel name="log">
            <!-- <div class="text-h6">日志信息</div> -->
            <log-info ref="logRef"></log-info>
          </q-tab-panel>

          <q-tab-panel name="error">
            <!-- <div class="text-h6">告警信息</div> -->
            <error-info ref="errorRef"></error-info>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>

    <!-- 无数据 -->
    <div v-else class="column justify-center items-center transform-no-data" style="flex: 1">
      <my-no-data :width="300"></my-no-data>
      <p>请在左侧选择监控单元</p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.UnitInfo {

  .search {
    width: 300px;
    padding: 0 8px;
    border: 1px solid #eff0f4;
    border-top: none;
  }
}
</style>
