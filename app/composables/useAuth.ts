export const useAuth = () => {
  const user = useState<User | null>("auth:user", () => null);
  const loading = useState<boolean>("auth:loading", () => false);
  const authenticated = computed(() => user.value !== null);

  const fetchUser = async () => {
    loading.value = true;

    try {
      const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
      const { user: userData } = await $fetch<{ user: User }>("/api/auth/me", { headers });

      user.value = userData;
      return userData;
    } catch (error) {
      user.value = null;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    loading.value = true;

    try {
      const { user: userData } = await $fetch<{ ok: boolean; user: User }>("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
      user.value = userData;
      return userData;
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    loading.value = true;

    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } finally {
      user.value = null;
      loading.value = false;
    }
  };

  return {
    user: readonly(user),
    loading: readonly(loading),
    authenticated: readonly(authenticated),
    fetchUser,
    login,
    logout,
  };
};
