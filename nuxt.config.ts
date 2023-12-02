// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/robots", "@nuxt/content"],
  content: {
    highlight: {
      preload: ["cpp"],
      theme: "dracula-soft",
    },
  },
  colorMode: {
    preference: "dark",
  },
  css: ["~/assets/css/main.css"],
});
