export const useApi = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const execute = async <T>(url: string, options: any = {}): Promise<BackendResponse<T>> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<T>(url, options);
      return {
        data: response,
        error: null,
        success: true,
      };
    } catch (error: any) {
      console.log("[useApi] Error: ", error.data);
      const errorMessage = error.data?.message || error.message || "An error occurred";
      error.value = errorMessage;

      return {
        data: null,
        error: errorMessage,
        success: false,
      };
    } finally {
      loading.value = false;
    }
  };

  return {
    error: readonly(error),
    loading: readonly(loading),
    execute: execute,
  };
};

interface BackendResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
