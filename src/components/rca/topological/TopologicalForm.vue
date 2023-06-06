<!-- 拓扑表单 -->
<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'

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
const addNE = () => {
  console.log('add network element')
}

</script>

<template>
  <div class="TopologicalForm">

    <div class="bg-blue-grey-1 row items-center q-pa-sm">
      <q-icon class="text-weight-bolder text-h5 q-pr-xs color-primary" name="notes"></q-icon>
      <p class="subtitle">编辑网元拓扑信息</p>
    </div>

    <div class="row items-center justify-center q-mt-md">
      <q-btn
        style="width: 150px"
        color="primary"
        outline
        label="添加网元"
        @click="addNE"
      >
      </q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.TopologicalForm {
  height: 100%;
  border: 1px solid #eff0f4;

  .subtitle {
    font-size: 1.1rem;
    font-weight: 600;
    color: #223b53;
    letter-spacing: 1px;
  }
}
</style>
