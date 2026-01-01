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
  const fetchQuizzes = async () => {
    const config = useRuntimeConfig()
    const { data, error } = await useLazyFetch<{ items: Quiz[] }>(
      `${config.public.apiBaseUrl}/quizzes`,
      { method: 'GET' }
    )

    if (!error.value && data.value?.items) {
      quizzes.value = data.value.items
    }
  }

  return {
    quizzes,
    fetchQuizzes,
  }
}
