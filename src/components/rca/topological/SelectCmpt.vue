<!-- 拓扑图筛选条件 -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { i18n } from 'boot/i18n'
import MyDateTimeRange from 'components/common/MyDateTimeRange.vue'

const tc = i18n.global.tc

interface BusinessOps {
  label: string
  value: string
}

interface QueryParams {
  business: BusinessOps
  timeRange: string[]
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
      timeRange: ['', '']
    }
  }
})

const emits = defineEmits(['changeParams'])

const businessOps = computed(() => props.businessOps)
const business = computed(() => props.queryParams.business)
const timeRange = ref(props.queryParams.timeRange)
const changeBusiness = (val: any) => {
  emits('changeParams', 'business', val)
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
