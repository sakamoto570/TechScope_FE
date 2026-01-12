<template>
  <div class="accordion">
    <button class="accordion-header" @click="isOpen = !isOpen">
      <slot name="title" />
      <span class="icon">{{ isOpen ? '▲' : '▼' }}</span>
    </button>

    <transition name="accordion">
      <div v-if="isOpen" class="accordion-body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped>
.accordion {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.accordion-header {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  background: #f7f7f7;
  border: none;
  cursor: pointer;
}

.accordion-body {
  padding: 12px;
  background: #fff;
}

/* アニメーション */
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}
</style>
