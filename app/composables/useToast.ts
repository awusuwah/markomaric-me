import { useToast as useToastification } from "vue-toastification";
import Toast from "@/components/toast/Toast.vue";

export const useToast = () => {
  const toast = useToastification();

  const notify = {
    success: (title: string, message: string, icon?: string): void => {
      sendNotification("success", title, message, icon);
    },
    danger: (title: string, message: string, icon?: string): void => {
      sendNotification("danger", title, message, icon);
    },
    warning: (title: string, message: string, icon?: string): void => {
      sendNotification("warning", title, message, icon);
    },
    info: (title: string, message: string, icon?: string): void => {
      sendNotification("info", title, message, icon);
    },
  };

  const sendNotification = (variant: ToastVariant, title: string, message: string, icon?: string): void => {
    toast({
      component: Toast,
      props: {
        title: title,
        message: message,
        variant: variant,
        icon: icon,
      },
    });
  };

  return {
    notify: notify,
  };
};

type ToastVariant = "success" | "danger" | "warning" | "info";
