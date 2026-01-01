<template>
  <CommonHeader>テスト</CommonHeader>
  今日の技術記事
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuizzes } from '../../composables/useQuizzes'

let quizzesStore: ReturnType<typeof useQuizzes> | null = null

onMounted(async () => {
  quizzesStore = useQuizzes()
  await quizzesStore.fetchQuizzes()
})
</script>
