<template>
  <div>
    <el-button class="custom-icon" @click="func(value)">{{ value }}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    func: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.custom-icon {
  font-size: 3rem;
}
</style>
