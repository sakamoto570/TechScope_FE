<template>
  <CommonHeader>テスト</CommonHeader>

  <div class="p-4">
    <p>今日の技術記事</p>

    <button @click="fetchQuizzes">再読み込み</button>

    <div v-if="loading">読み込み中...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>

    <ul v-else>
      <li v-for="(quiz, index) in quizzes" :key="index">
        {{ quiz.question }}（難易度: {{ quiz.difficulty }}）
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuizzes } from '../../composables/useQuizzes'

const { quizzes, loading, errorMessage, fetchQuizzes } = useQuizzes()

onMounted(() => {
  fetchQuizzes()
})
</script>
