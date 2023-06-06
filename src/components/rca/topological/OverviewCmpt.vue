<!-- 业务系统概览信息 -->
<script setup lang="ts">
import { ref, nextTick, reactive, onMounted } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'

import MyNoData from 'components/common/MyNoData.vue'
import MyCtColumnBar from 'components/common/MyCtColumnBar.vue'
import StatisticsChart from './StatisticsChart.vue'
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
const tc = i18n.global.tc

const overViewData = reactive({
  request: {
    label: '请求数',
    value: 1234,
    alias: '',
    icon: 'settings_input_antenna'
  },
  successRate: {
    label: '成功率',
    value: '98%',
    alias: '',
    icon: 'done_all'
  },
  response: {
    label: '平均响应时间',
    value: 340,
    alias: 'ms',
    icon: 'access_time'
  },
  error: {
    label: '告警数',
    value: 32,
    alias: '',
    icon: 'error_outline'
  },
  resolve: {
    label: '未处理数',
    value: 12,
    alias: '',
    icon: 'handyman'
  }
})
const sysData = reactive({
  time: {
    label: '运行时间',
    value: 1,
    alias: 'year',
    icon: 'trending_up'
  },
  cpu: {
    label: 'CPU核数',
    value: 64,
    alias: '',
    icon: 'trending_up'
  },
  memory: {
    label: '总内存',
    value: 252,
    alias: 'GiB',
    icon: 'trending_up'
  }
})
const statisticsRef = ref()
const sysChartRef = ref()
const sysChartParams = reactive({
  style: {
    width: 400,
    height: 180
  },
  info: {
    data: [
      { type: '总CPU使用率', value: 12.0 },
      { type: '最大分区(/)使用率', value: 4.6 },
      { type: '交换分区使用率', value: 0.0 }
    ],
    chart: {
      padding: [10, 30, 10, 110],
      position: 'type*value',
      label: 'type',
      value: 'value',
      alias: '%'
    }
  }
})
const ranklist = reactive([
  {
    name: 'mails.ucas.ac.cn',
    value: 137739,
    icon: 'emoji_events',
    color: 'text-aiops-negative',
    rank: '1'
  },
  {
    name: 'bao.ac.cn',
    value: 100987,
    icon: 'emoji_events',
    color: 'text-aiops-secondary',
    rank: '2'
  },
  {
    name: 'impcas.ac.cn',
    value: 82447,
    icon: 'emoji_events',
    color: 'text-aiops-btn-border',
    rank: '3'
  },
  {
    name: 'dicp.ac.cn',
    value: 70408,
    rank: '4'
  },
  {
    name: 'rcees.ac.cn',
    value: 60476,
    rank: 5
  },
  {
    name: 'siat.ac.cn',
    value: 40625,
    rank: 6
  },
  {
    name: 'sinano.ac.cn',
    value: 35378,
    rank: 7
  },
  {
    name: 'mail.iggcas.ac.cn',
    value: 27648,
    rank: 8
  },
  {
    name: 'simm.ac.cn',
    value: 26777,
    rank: 9
  },
  {
    name: 'ibcas.ac.cn',
    value: 26173,
    rank: 10
  }
])

onMounted(async () => {
  await nextTick()
  if (statisticsRef.value) {
    statisticsRef.value.show()
  }
  if (sysChartRef.value) {
    sysChartRef.value.show()
  }
})
</script>

<template>
  <div class="OverviewCmpt text-body2 text-aiops-sub-font">
    <p class="text-h6 text-weight-bold text-center q-py-sm">{{ tc('sysOverview') }}</p>
    <q-scroll-area style="height: calc(100% - 80px)">

      <!-- 请求数，平均响应时间，告警数，未处理数 -->
      <div class="top-data row justify-between">
        <div class="data-card row items-center" v-for="(item, index) in overViewData" :key="index">
          <q-icon :name="item.icon" class="color-primary text-h5"></q-icon>
          <div class="q-pl-xs">
            <p class="label">{{ item.label }}</p>
            <span class="data">{{ item.value }}</span>
            <span class="q-pl-xs">{{ item.alias }}</span>
          </div>
        </div>
      </div>

      <!-- 告警等级统计， 处理状态统计 -->
      <statistics-chart ref="statisticsRef" class="q-mt-sm"></statistics-chart>

      <!-- 域名登录成功top10 -->
      <div class="title row justify-between" style="margin-top: 5px;">
        <p class="text-weight-bold">
          <q-icon name="local_fire_department" class="text-aiops-secondary" style="font-size: 18px;"></q-icon>
          域名登录成功 Top10
        </p>
      </div>

      <div class="ranklist row">
        <div class="col-6">
          <div class="domain row items-center" v-for="(item, index) in ranklist.slice(0, 5)" :key="index">
            <q-icon v-if="item.icon" :class="[item.color]" :name="item.icon" style="margin-right: 6px; font-size: 18px;"></q-icon>
            <p v-else style="padding-left: 6px; width: 26px;">{{ item.rank }}</p>
            <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
            <p>{{ item.value }}</p>
          </div>
        </div>

        <div class="col-6">
          <div class="domain row items-center" v-for="(item, index) in ranklist.slice(5)" :key="index">
            <q-icon v-if="item.icon" :class="[item.color]" :name="item.icon" style="margin-right: 6px; font-size: 18px;"></q-icon>
            <p v-else style="padding-left: 6px; width: 26px;">{{ item.rank }}</p>
            <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
            <p>{{ item.value }}</p>
          </div>
        </div>
      </div>

      <!-- 操作系统信息 -->
      <div class="sys-data row">
        <div class="col-4">
          <div v-for="(item, index) in sysData" :key="index" class="row" style="padding: 10px 18px;">
            <q-icon :name="item.icon" class="color-primary text-h4"></q-icon>
            <div class="q-ml-sm">
              <p class="label">{{ item.label }}</p>
              <span class="data">{{ item.value }}</span>
              <span class="q-pl-xs">{{ item.alias }}</span>
            </div>
          </div>
        </div>

        <div class="sys-chart col-8">
          <my-ct-column-bar ref="sysChartRef" :params="sysChartParams" idName="sysChart"></my-ct-column-bar>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped>
@import "~css/mixins.scss";

.OverviewCmpt {
  height: 100%;
  border: 1px solid #eff0f4;
  background: #fff;
  padding: 0 10px;

  .top-data {

    .data-card {
      padding: 6px 8px;
      border-radius: 6px;
      background: rgb(239, 240, 244);

      .data{
        font-family: alimama;
        font-size: 16px;
        color: $aiops-primary;
      }
    }
  }

  .title {
    padding: 0 6px;
    line-height: 36px;
    background: rgb(239, 240, 244);
    border-radius: 6px 6px 0 0;
  }

  .ranklist {
    padding: 0 6px;
    background: #fafafa;

    .domain {
      line-height: 36px;
    }
  }

  .sys-data {
    margin-top: 24px;
    border-radius: 6px;
    background: #fafafa;
  }

}
</style>
