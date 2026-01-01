// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app/',
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://your-api-id.execute-api.ap-northeast-1.amazonaws.com/prod',
    },
  },
})
