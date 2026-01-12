import { ref } from 'vue'

export type ApiQuiz = {
  question: string
  choices: string[]
  answerIndex: number
  rationale: string
  difficulty: string
  content: string
  title: string
  url: string
  id: string // "QUIZ#NEWS#2026-01-03T08:59:43.000Z"
}

// 画面用に selectedIndex を追加
export type Quiz = ApiQuiz & {
  selectedIndex: number | null
  result: string
}

export const useQuizzes = () => {
  const quizzes = ref<Quiz[]>([])
  const todaysQuizzes = ref<Quiz[]>([])
  const otherQuizzes = ref<Quiz[]>([])
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  const toYMD = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`

  const extractDateFromKey = (key: string) => {
    const parts = key.split('#')
    return parts[parts.length - 1] ?? ''
  }

  const isOnOrAfterYesterdayFromKey = (key?: string) => {
    if (!key) return false
    const dateStr = extractDateFromKey(key)
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return false
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    return toYMD(d) >= toYMD(yesterday)
  }

  const getKey = (q: any) => q.pk ?? q.PK ?? q.id ?? q.ID ?? ''

  const partitionQuizzes = (data: Quiz[]) => {
    todaysQuizzes.value = []
    otherQuizzes.value = []

    data.forEach((q) => {
      const key = getKey(q as any)
      if (isOnOrAfterYesterdayFromKey(key)) {
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

      // ここで selectedIndex を生やす
      const mapped: Quiz[] = data.map((q) => ({
        ...q,
        selectedIndex: null,
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
    loading,
    errorMessage,
    fetchQuizzes,
  }
}
