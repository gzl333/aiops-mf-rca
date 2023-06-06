<!-- 性能组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch } from 'vue'
import { lineData } from 'components/common/myctline'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'
import MyCtPie from 'components/common/MyCtPie.vue'
import MyCtPieRose from 'components/common/MyCtPieRose.vue'

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
interface Params {
  style: {
    width?: number
    height?: number
    [propName: string]: any
  },
  info: {
    data: any
    [propName: string]: any
  },
  [propName: string]: any
}

interface Props {
  params?: Params
  idName?: string
  // activeId: string
}

const props = withDefaults(defineProps<Props>(), {
  params: () => {
    return {
      style: {
        width: 400,
        height: 300
      },
      info: {
        data: [{ value: 5.6 }]
      }
    }
  },
  idName: 'c'
  // activeId: 'activeId'
})

const levelRef = ref()
const stateRef = ref()

const levelParams = reactive({
  style: {
    height: 160
  },
  info: {
    data: [
      { item: '警告', count: 39, percent: 0.39 },
      { item: '严重', count: 21, percent: 0.21 },
      { item: '一般', count: 40, percent: 0.4 }
    ],
    chart: {
      padding: [5, 50, 35, 30],
      position: 'count',
      color: {
        type: 'item',
        color: ['#FC5531', '#F2C037', '#dcdfe6']
      },
      tooltip: 'item*percent'
    }
  }
})
const stateParams = reactive({
  style: {
    height: 160
  },
  info: {
    data: [
      { item: '待处理', count: 32 },
      { item: '处理中', count: 21 },
      { item: '已关闭', count: 39 }
    ],
    chart: {
      padding: [5, 50, 35, 30],
      color: {
        type: 'item',
        color: ['#0090FF', '#FFAC33', '#21BA45']
      },
      position: 'item*count'
    }
  }
})

const isShow = ref(false)

const show = async () => {
  isShow.value = true
}

const hidden = async () => {
  isShow.value = false
}

watch(() => isShow.value, async (val) => {
  await nextTick()

  if (val) {
    levelRef.value.show()
    stateRef.value.show()
  } else {
    levelRef.value.hidden()
    stateRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="StatisticsChart row" v-if="isShow">
    <div class="q-pa-sm col-6">
      <p class="title">
        <i class="lar la-circle text-aiops-primary"></i>
         告警等级统计
      </p>
      <my-ct-pie ref="levelRef" :params="levelParams" idName="level"></my-ct-pie>
    </div>

    <div class="q-pa-sm col-6">
      <p class="title">
        <i class="lar la-circle text-aiops-primary"></i>
        处理状态统计
      </p>
      <my-ct-pie-rose ref="stateRef" :params="stateParams" idName="state"></my-ct-pie-rose>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.StatisticsChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
