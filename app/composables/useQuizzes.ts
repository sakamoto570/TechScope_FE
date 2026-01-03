// composables/useQuizzes.ts
import { ref } from 'vue'

type Quiz = {
  question: string
  choices: string[]
  answerIndex: number
  rationale: string
  difficulty: string
  content: string
  url: string
}

export const useQuizzes = () => {
  const quizzes = ref<Quiz[]>([])
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  const fetchQuizzes = async () => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBaseUrl}/quizzes`

    loading.value = true
    errorMessage.value = null

    const { data, error } = await useLazyFetch<Quiz[]>(url, {
      method: 'GET',
    })

    if (error.value) {
      console.error('fetchQuizzes error', error.value)
      errorMessage.value = error.value.message ?? 'クイズ取得に失敗しました'
    } else if (data.value) {
      quizzes.value = data.value
    }

    loading.value = false
  }

  return {
    quizzes,
    loading,
    errorMessage,
    fetchQuizzes,
  }
}
