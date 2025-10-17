import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  srcDir: "app/",
  serverDir: "server/",
  modules: ["@nuxt/icon"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/assets/main.css"],
  icon: {
    componentName: "NuxtIcon",
  },
  app: {
    head: {
      bodyAttrs: {
        class: "bg-bgr",
      },
    },
  },
});
