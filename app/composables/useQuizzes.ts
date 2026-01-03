import { ref } from 'vue'

export type Quiz = {
  question: string
  choices: string[]
  answerIndex: number
  rationale: string
  difficulty: string
  content: string
  url: string
  id: string
}

export const useQuizzes = () => {
  const quizzes = ref<Quiz[]>([])
  const todaysQuizzes = ref<Quiz[]>([])
  const otherQuizzes = ref<Quiz[]>([])
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  const toYMD = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  const extractDateFromId = (id: string) => {
    const parts = id.split('#')
    return parts[parts.length - 1] ?? ''
  }

  const isTodayFromId = (id?: string) => {
    if (!id) return false
    const dateStr = extractDateFromId(id)
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return false
    return toYMD(d) === toYMD(new Date())
  }

  const getId = (q: any) => q.id ?? q.id ?? q.id ?? q.ID ?? ''

  const partitionQuizzes = (data: Quiz[]) => {
    todaysQuizzes.value = []
    otherQuizzes.value = []
    data.forEach((q) => {
      const id = getId(q as any)
      if (isTodayFromId(id)) todaysQuizzes.value.push(q)
      else otherQuizzes.value.push(q)
    })
  }

  const fetchQuizzes = async () => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBaseUrl}/quizzes`

    loading.value = true
    errorMessage.value = null

    try {
      const data = await $fetch<any[]>(url, {
        method: 'GET',
      })

      quizzes.value = data
      partitionQuizzes(data as Quiz[])
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
