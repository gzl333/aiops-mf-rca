<!-- 日期时间段选择 -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { i18n } from 'boot/i18n'
import { date } from 'quasar'

const tc = i18n.global.tc

interface Props {
  width?: number
  label?: string
  timeRange?: any
  mask?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 220,
  label: 'timeSel',
  mask: 'YYYY-MM-DD HH:mm',
  timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { day: 1 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')]
})

const emit = defineEmits(['changeTimeRange'])
const timePickedStart = ref(props.timeRange[0])
const timePickedEnd = ref(props.timeRange[1])

watch(() => timePickedStart.value, (val) => {
  timeRangeChanged()
})

watch(() => timePickedEnd.value, (val) => {
  timeRangeChanged()
})

/**
 * @desc: 更改时间时触发
 * @return {*}
 */
const timeRangeChanged = () => {
  const start = timePickedStart.value
  const end = timePickedEnd.value
  emit('changeTimeRange', [start, end])
}

/**
 * @desc: 输入时间格式校验， 例：2023-02-07 14:25
 * @param {*} val  输入的字符串
 * @return {*}
 */
const timeRangeVali = (val: string) => {
  // const dateTimeReg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1]?[0-9]|2[0-3]):([0-5][0-9])/g
  // dateTimeReg.test(val)
  console.log(date.isValid(val))
  return date.isValid(val) || '请输入正确格式的时间'
}

</script>

<template>
  <div class="MyDateTimeRange">
    <div class="row">
      <label class="q-pr-sm q-pt-sm" for="business">{{ tc(label) }}</label>

      <q-input
        :style="{width: `${width}px`}"
        input-class="cursor-pointer"
        outlined
        v-model="timePickedStart"
        :dense="true"
        :rules="[timeRangeVali]"
      >
        <template #prepend>
          <q-icon name="las la-calendar-alt" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                minimal
                default-view="Months"
                :mask="mask"
                v-model="timePickedStart"
                @update:model-value="timeRangeChanged"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup :label="tc('close')" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template #append>
          <q-icon name="las la-clock" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="timePickedStart" :mask="mask" format24h @update:model-value="timeRangeChanged">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup :label="tc('close')" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <p class="q-pt-sm q-px-sm">—</p>

      <q-input
        :style="{width: `${width}px`}"
        input-class="cursor-pointer"
        outlined
        v-model="timePickedEnd"
        :dense="true"
        :rules="[timeRangeVali]"
      >
        <template #prepend>
          <q-icon name="las la-calendar-alt" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                minimal
                default-view="Months"
                :mask="mask"
                v-model="timePickedEnd"
                @update:model-value="timeRangeChanged"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup :label="tc('close')" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template #append>
          <q-icon name="las la-clock" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="timePickedEnd" :mask="mask" format24h @update:model-value="timeRangeChanged">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup :label="tc('close')" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.MyDateTimeRange {
}
</style>
