<!-- 故障拓扑筛选条件 -->
<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'
import { date } from 'quasar'

import MyDateTimeRange from 'components/common/MyDateTimeRange.vue'
import api from 'src/api'

const tc = i18n.global.tc

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
  queryParams: QueryParams
  businessOps: Options[]
  unitOps: Options[]
}

const props = withDefaults(defineProps<Props>(), {
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
  },
  businessOps: () => {
    return [
      {
        label: '',
        value: ''
      }
    ]
  },
  unitOps: () => {
    return [
      {
        label: '',
        value: ''
      }
    ]
  }
})

const emits = defineEmits(['changeParams'])

// const store = useStore()
// const route = userRoute()
const businessOps = computed(() => props.businessOps)
const business = computed(() => props.queryParams.business) // ref(businessOps.value[0])
const unitOps = computed(() => props.unitOps)
const unit = computed(() => props.queryParams.unit)
const timeRange = computed(() => props.queryParams.timeRange) // ref<[string, string] | undefined>()

const changeBusiness = (val: any) => {
  emits('changeParams', 'business', val)
}

const changeUnit = (val: Record<string, string>) => {
  emits('changeParams', 'unit', val)
}

const changeTimeRange = (val: [string, string]) => {
  emits('changeParams', 'timeRange', val)
}

</script>

<template>
  <div class="SelectCmpt">
    <div class="row justify-between">
      <div class="row">
        <label class="q-pr-sm q-pt-sm" for="business">{{ tc('business') }}</label>
        <q-select
          style="width: 240px"
          outlined
          v-model="business"
          :dense="true"
          :options="businessOps"
          :option-value="item => item.value"
          :option-label="item => item.label"
          @update:model-value="changeBusiness"
        >
        </q-select>

        <label class="q-pr-sm q-pt-sm q-ml-md" for="monitor">{{ tc('monitorU') }}</label>
        <q-select
          style="width: 240px"
          outlined
          v-model="unit"
          :dense="true"
          :options="unitOps"
          :option-value="item => item.value"
          :option-label="item => item.label"
          @update:model-value="changeUnit"
        >
        </q-select>
      </div>

      <my-date-time-range
        :time-range="timeRange"
        @change-time-range="changeTimeRange"
      ></my-date-time-range>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SelectCmpt {
  padding: 0 8px;
  border-bottom: 1px solid #eff0f4;
}
</style>
