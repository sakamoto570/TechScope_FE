<template>
  <CommonHeader>テスト</CommonHeader>

  <div class="p-4">
    <p>今日の技術記事</p>

    <button @click="fetchQuizzes">再読み込み</button>

    <div v-if="loading">読み込み中...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>

    <div v-else>
      <div v-if="todaysQuizzes.length">
        <ul>
          <li v-for="(quiz, index) in todaysQuizzes" :key="quiz.id ?? quiz.id ?? index">
            {{ quiz.question }}（難易度: {{ quiz.difficulty }}）
          </li>
        </ul>
      </div>
      <div v-else>
        <p>本日の記事はありません</p>
      </div>

      <p class="mt-6">以前の技術記事</p>

      <div v-if="otherQuizzes.length">
        <ul>
          <li v-for="(quiz, index) in otherQuizzes" :key="quiz.id ?? quiz.id ?? index">
            {{ quiz.question }}（難易度: {{ quiz.difficulty }}）
          </li>
        </ul>
      </div>
      <div v-else>
        <p>以前の記事はありません</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useQuizzes } from '../../composables/useQuizzes'

const { todaysQuizzes, otherQuizzes, loading, errorMessage, fetchQuizzes } = useQuizzes()

watch([todaysQuizzes, otherQuizzes], ([t, o]) => {
  console.log('Quizzes updated:', { todays: t, other: o })
})

onMounted(() => {
  fetchQuizzes()
})
</script>
