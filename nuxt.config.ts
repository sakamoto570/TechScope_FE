// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app/',
  ssr: false,
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://es0lfofsc0.execute-api.ap-northeast-1.amazonaws.com/news',
    },
  },
})
