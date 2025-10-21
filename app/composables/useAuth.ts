import { LOGIN_SCHEMA, REGISTER_SCHEMA } from "@/schemas/auth";

export const useAuth = () => {
  const { execute } = useApi();
  const { notify } = useToast();

  const user = useState<User | null>("auth:user", () => null);
  const loading = useState<boolean>("auth:loading", () => false);
  const authenticated = computed(() => user.value !== null);

  const fetchUser = async (): Promise<User | null> => {
    if (user.value) return user.value;
    loading.value = true;

    const p = (async () => {
      try {
        const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
        const { data, error, success } = await execute<User>("/api/auth/me", {
          method: "GET",
          headers,
        });

        // User has been found, set the user state
        if (success && data) {
          user.value = data;
          return data;
        }

        // User has not been found, set the user state to null
        user.value = null;
        return null;
      } catch {
        // User has not been found, set the user state to null
        user.value = null;
        return null;
      } finally {
        loading.value = false;
      }
    })();

    return await p;
  };

  const register = async (firstname: string, lastname: string, username: string, email: string, password: string): Promise<User | null> => {
    loading.value = true;

    const { data, error, success } = await execute<User>("/api/auth/register", {
      method: "POST",
      body: {
        firstname,
        lastname,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
      },
    });

    if (success && data) {
      loading.value = false;
      user.value = data;
      return data;
    }

    loading.value = false;
    user.value = null;
    notify.danger("Registration Failed", error as string);
    return null;
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    loading.value = true;

    const { data, error, success } = await execute<User>("/api/auth/login", {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    if (success && data) {
      user.value = data;
      loading.value = false;
      return data;
    }

    user.value = null;
    loading.value = false;
    notify.danger("Login Failed", error as string);
    return null;
  };

  const logout = async (): Promise<void> => {
    loading.value = true;

    try {
      await execute("/api/auth/logout", { method: "POST" });
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
    register,
  };
};
