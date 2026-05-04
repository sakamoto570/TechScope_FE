import { ref } from 'vue'

export type ApiQuiz = {
  question: string
  choices: string[]
  answerIndex: number
  rationale: string
  difficulty: string
  content?: string
  title: string
  url: string
  id: string

  // 追加想定
  publishedAt?: string
  source?: string
  newsId?: string
}

export type Quiz = ApiQuiz & {
  selectedIndex: number | null
  result?: string
}

export const useQuizzes = () => {
  const quizzes = ref<Quiz[]>([])
  const todaysQuizzes = ref<Quiz[]>([])
  const otherQuizzes = ref<Quiz[]>([])
  const mediumQuizzes = ref<Quiz[]>([])
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  const toYMD = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`

  const isOnOrAfterYesterday = (publishedAt?: string) => {
    if (!publishedAt) return false

    const d = new Date(publishedAt)
    if (isNaN(d.getTime())) return false

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    return toYMD(d) >= toYMD(yesterday)
  }

  const isMedium = (q: Quiz) => {
    return q.source === 'medium' || q.url.includes('medium.com')
  }

  const partitionQuizzes = (data: Quiz[]) => {
    todaysQuizzes.value = []
    otherQuizzes.value = []
    mediumQuizzes.value = []

    data.forEach((q) => {
      if (isMedium(q)) {
        mediumQuizzes.value.push(q)
        return
      }

      if (isOnOrAfterYesterday(q.publishedAt)) {
        todaysQuizzes.value.push(q)
      } else {
        otherQuizzes.value.push(q)
      }
    })
  }

  const fetchQuizzes = async () => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBaseUrl}/quizzes`

    loading.value = true
    errorMessage.value = null

    try {
      const data = await $fetch<ApiQuiz[]>(url, {
        method: 'GET',
      })

      const mapped: Quiz[] = data.map((q) => ({
        ...q,
        selectedIndex: null,
        result: '',
      }))

      quizzes.value = mapped
      partitionQuizzes(mapped)
    } catch (err: any) {
      console.error('fetchQuizzes error', err)
      errorMessage.value = err?.message ?? 'クイズの取得に失敗しました'
    } finally {
      loading.value = false
    }
  }

  return {
    quizzes,
    todaysQuizzes,
    otherQuizzes,
    mediumQuizzes,
    loading,
    errorMessage,
    fetchQuizzes,
  }
}
