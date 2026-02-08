<template>
  <CommonHeader>Tech Scope</CommonHeader>

  <div class="p-4">
    <p class="title">■今日の技術記事</p>
    <div v-if="todaysQuizzes.length">
      <ul>
        <li v-for="(quiz, index) in todaysQuizzes" :key="quiz.id ?? index" class="quizes-item">
          {{ quiz.title }}
          <a :href="quiz.url" target="_blank"
            ><img src="~/assets/icons/link.png" class="link-icon"
          /></a>
          <CommonAcordion>
            <template #title>問題：{{ quiz.question }}</template>
            <CommonRadioGroup
              v-model="quiz.selectedIndex"
              :choices="quiz.choices"
              :name="quiz.id"
            />
            <CommonButton class="button" @click="submit(quiz)">選択</CommonButton>
            <div
              v-if="quiz.result"
              :class="quiz.result === '正解' ? 'text-green' : 'text-red'"
              class="result"
            >
              {{ quiz.result }}
              <div class="explanation">{{ quiz.rationale }}</div>
            </div>
          </CommonAcordion>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>本日の記事はありません</p>
    </div>
    <p class="mt-6 title">■以前の技術記事</p>
    <CommonAcordion>
      <template #title>過去のクイズ</template>
      <div v-if="otherQuizzes.length">
        <ul>
          <li v-for="(quiz, index) in otherQuizzes" :key="quiz.id ?? index" class="quizes-item">
            {{ quiz.title }}
            <a :href="quiz.url" target="_blank"
              ><img src="~/assets/icons/link.png" class="link-icon"
            /></a>
            <CommonAcordion>
              <template #title>問題：{{ quiz.question }}</template>
              <CommonRadioGroup
                v-model="quiz.selectedIndex"
                :choices="quiz.choices"
                :name="quiz.id + '-old'"
                class="quizes-radio-group"
              />
              <CommonButton class="button" @click="submit(quiz)">選択</CommonButton>
              <div
                v-if="quiz.result"
                :class="quiz.result === '正解' ? 'text-green' : 'text-red'"
                class="result"
              >
                {{ quiz.result }}
                <div class="explanation">{{ quiz.rationale }}</div>
              </div>
            </CommonAcordion>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>以前の記事はありません</p>
      </div>
    </CommonAcordion>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useQuizzes } from '../../composables/useQuizzes'
import type { Quiz } from '../../composables/useQuizzes'

const { todaysQuizzes, otherQuizzes, loading, errorMessage, fetchQuizzes } = useQuizzes()

watch([todaysQuizzes, otherQuizzes], ([t, o]) => {
  console.log('Quizzes updated:', { todays: t, other: o })
})

const submit = (quiz: Quiz) => {
  if (quiz.selectedIndex === quiz.answerIndex) {
    quiz.result = '正解'
  } else {
    quiz.result = '不正解'
  }
}

onMounted(() => {
  fetchQuizzes()
})
</script>

<style scoped>
.title {
  font-weight: bold;
}
.button,
.quizes-item,
.result {
  margin-top: 16px;
}
.quizes-radio-group {
  margin-top: 8px;
}
.link-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  vertical-align: middle;
}
.text-green {
  color: #28a745;
  font-weight: bold;
}
.text-red {
  color: #dc3545;
  font-weight: bold;
}
.explanation {
  color: #555;
}
</style>
