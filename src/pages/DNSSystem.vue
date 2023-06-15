<!-- 故障拓扑页 -->
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { date } from 'quasar'
import { storeToRefs } from 'pinia'
import { useStore } from 'stores/rca/topological'
import { i18n } from 'boot/i18n'

import SelectCmpt from 'components/rca/topological/SelectCmpt.vue'
import TopologicalCmpt from 'components/rca/topological/TopologicalCmpt.vue'
import OverviewCmpt from 'src/components/rca/topological/OverviewCmpt.vue'
// import TopologicalForm from 'components/rca/topological/TopologicalForm.vue'
// import MyNoData from 'components/common/MyNoData.vue'

const tc = i18n.global.tc
const store = useStore()
const { businessOps } = storeToRefs(store)

const selectCmpt = ref()
const topoCmpt = ref()
const isTopo = ref(false) // 是否展示拓扑图
const isTopoForm = ref(false) // 是否展示拓扑表单
const isOverview = ref(false) // 是否展示概览信息
const topoPadding = ref(726)

const queryParams = reactive({
  business: {
    label: '邮件系统',
    value: '111'
  },
  timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')]
})

/**
 * @desc: 监听时间选择数据，并更新store
 * @return {*}
 */
watch(() => queryParams.timeRange, (val) => {
  store.$patch({
    startTime: val[0],
    endTime: val[1]
  })
}, {
  immediate: true
})

/**
 * @desc: 监听业务系统选择数据，并更新store
 * @return {*}
 */
watch(() => queryParams.business, (val) => {
  store.currentBusiness = val
}, {
  immediate: true
})

/**
 * @desc: 同步业务系统和时间组件值
 * @param {*} field
 * @param {*} val
 * @return {*}
 */
const changeParams = (field: 'business' | 'timeRange', val: any) => {
  queryParams[field] = val
  console.log('queryParams===>', queryParams)
}

const createTopo = () => {
  isTopo.value = true
  isTopoForm.value = true
  console.log('create topo')

  overviewStyle.btnRight = 442
  overviewStyle.shrinkOvwIcon = 'chevron_left'
  overviewStyle.shrinkOvwTitle = '展示概览'
}

// 表单显示设置
const topoFormStyle = reactive({
  isShrinkForm: false,
  formStyle: '',
  btnRight: 442,
  shrinkFormIcon: 'chevron_right',
  shrinkFormTitle: '收缩表单'
})

// 概览显示设置
const overviewStyle = reactive({
  isShrinkOvw: false,
  ovwStyle: '',
  btnRight: 726,
  shrinkOvwIcon: 'chevron_right',
  shrinkOvwTitle: '收缩概览'
})

const toggleForm = () => {
  topoFormStyle.isShrinkForm = !topoFormStyle.isShrinkForm
}

const toggleOvw = () => {
  isOverview.value = true
  overviewStyle.isShrinkOvw = !overviewStyle.isShrinkOvw
}

watch(() => topoFormStyle.isShrinkForm, (count, preCount) => {
  if (count) {
    topoPadding.value = 0
    topoFormStyle.formStyle = 'transform: translateX(440px)'
    topoFormStyle.btnRight = 26
    topoFormStyle.shrinkFormIcon = 'chevron_left'
    topoFormStyle.shrinkFormTitle = '展示表单'

    overviewStyle.btnRight = 442
  } else {
    topoPadding.value = 442
    topoFormStyle.formStyle = ''
    topoFormStyle.btnRight = 442
    topoFormStyle.shrinkFormIcon = 'chevron_right'
    topoFormStyle.shrinkFormTitle = '收缩表单'

    isOverview.value = false
  }
})

watch(() => overviewStyle.isShrinkOvw, (count, preCount) => {
  if (count) {
    topoPadding.value = 0
    overviewStyle.ovwStyle = 'transform: translateX(726px)'
    overviewStyle.btnRight = 26
    overviewStyle.shrinkOvwIcon = 'chevron_left'
    overviewStyle.shrinkOvwTitle = '展示概览'

    topoFormStyle.btnRight = 26
  } else {
    topoPadding.value = 726
    overviewStyle.ovwStyle = ''
    overviewStyle.btnRight = 726
    overviewStyle.shrinkOvwIcon = 'chevron_right'
    overviewStyle.shrinkOvwTitle = '收缩概览'

    topoFormStyle.formStyle = 'transform: translateX(440px)'
    topoFormStyle.btnRight = 726
    topoFormStyle.shrinkFormIcon = 'chevron_left'
    topoFormStyle.shrinkFormTitle = '展示表单'
  }
})

const drawerRight = ref(true)

</script>

<template>
  <div class="TopologicalPage">
    <p>DNS系统</p>
    <q-layout container view="hHh Lpr lff" v-if="false">
      <!-- 条件查询 -->
      <q-header class="bg-white text-aiops-sub-font">
        <select-cmpt
          ref="selectCmpt"
          :queryParams="queryParams"
          :businessOps="businessOps"
          @changeParams="changeParams"
          >
        </select-cmpt>
      </q-header>

      <!-- 业务系统概览 -->
      <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        :width="590"
        :breakpoint="1200"
      >
        <overview-cmpt
          class="topological-overview"
          :style="overviewStyle.ovwStyle"
        >
        </overview-cmpt>
      </q-drawer>

      <!-- 拓扑图 -->
      <q-page-container>
        <q-page>
          <topological-cmpt ref="topoCmpt"></topological-cmpt>
        </q-page>
      </q-page-container>

      <!-- 概览收缩按钮 -->
      <div class="fixed" :style="{top: '60px', right: drawerRight ? '590px' : '0px'}">
        <q-btn
          class="bg-aiops-primary"
          style="width: 18px; font-size: 12px; height: 44px"
          text-color="white"
          dense
          unelevated
          :title="drawerRight? tc('shrink') : tc('expand')"
          :icon="drawerRight? 'chevron_right' : 'chevron_left'"
          @click="drawerRight = !drawerRight, topoCmpt.resetContainer()"
        />
      </div>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
.TopologicalPage {
  padding: 10px;
  height: 100%;

  // :deep(.scroll) {
  //   overflow: hidden;
  // }

  .topological-form {
    width: 414px;
    right: 26px;
    top: 136px;
  }

  .topological-overview {
    width: 590px;
  }
}
</style>
