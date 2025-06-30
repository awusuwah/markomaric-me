import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  ssr: false,
  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxt/icon"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "scroll-smooth",
      },
      bodyAttrs: {
        class: "bg-bgr",
      },
    },
  },

  // Configuration for the `@nuxt/icon` module
  icon: {
    mode: "css",
    cssLayer: "base",
    componentName: "NuxtIcon",
  },
});
