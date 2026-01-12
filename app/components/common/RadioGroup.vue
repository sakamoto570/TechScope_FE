<template>
  <div class="radio-group">
    <label v-for="(choice, index) in choices" :key="index" class="radio-item">
      <input type="radio" :name="name" :checked="innerValue === index" @change="onChange(index)" />
      <span>{{ choice }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number | null // 選択された index（0,1,2...）
  choices: string[] // ["選択肢1", "選択肢2", ...]
  name?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (v: number | null) => emit('update:modelValue', v),
})

const onChange = (index: number) => {
  innerValue.value = index
}
</script>

<style scoped>
.radio-group {
  display: grid;
  gap: 6px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.radio-item input {
  accent-color: #4a90e2;
}
</style>
