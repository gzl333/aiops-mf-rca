<!-- 故障拓扑筛选条件 -->
<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'

import { date } from 'quasar'

import MyDateTimeRange from 'components/common/MyDateTimeRange.vue'

const tc = i18n.global.tc

interface BusinessOps {
  label: ''
  value: ''
}

interface QueryParams {
  business: BusinessOps
  timeRange: [string, string]
}

interface Props {
  queryParams: QueryParams
  businessOps: BusinessOps[]
}

const props = withDefaults(defineProps<Props>(), {
  queryParams: () => {
    return {
      business: {
        label: '',
        value: ''
      },
      timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { day: 1 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')]
    }
  }
})

const emits = defineEmits(['changeParams'])

// const store = useStore()
// const route = userRoute()
const businessOps = computed(() => props.businessOps)
const business = computed(() => props.queryParams.business) // ref(businessOps.value[0])
const defaultTimeRange = ref(props.queryParams.timeRange) // ref<[string, string] | undefined>()
const timeRange = ref(props.queryParams.timeRange)
const changeBusiness = (val: any) => {
  emits('changeParams', 'business', val)
}

const changeTimeRange = (val: [string, string]) => {
  // timeRange.value = val
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
      </div>

      <my-date-time-range
        :time-range="defaultTimeRange"
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
