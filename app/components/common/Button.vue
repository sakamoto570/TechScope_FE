<template>
  <button class="btn" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.btn {
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;

  /* 程よい青 */
  background: #4a90e2;
  color: #fff;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition:
    background 0.2s,
    transform 0.1s;
}

.btn:hover {
  background: #3a7bd5;
}

.btn:active {
  transform: scale(0.97);
}
</style>
