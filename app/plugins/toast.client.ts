import Toastification, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    draggable: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    hideProgressBar: true,
    position: POSITION.TOP_RIGHT,
    icon: false,
    timeout: 5000,

    transition: "Vue-Toastification__bounce",
    maxToasts: 4,
    newestOnTop: true,
    closeButton: false,
  };

  nuxtApp.vueApp.use(Toastification, options);
});
