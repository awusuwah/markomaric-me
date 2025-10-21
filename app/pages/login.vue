<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Text from "@/components/inputs/text/Text.vue";
import { LOGIN_SCHEMA } from "@/schemas/auth";

const route = useRoute();
const { notify } = useToast();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");

const submitState = ref<ButtonState>("idle");

const loginUser = async (): Promise<void> => {
  submitState.value = "loading";

  const validated = LOGIN_SCHEMA.safeParse({ email: email.value, password: password.value });
  if (!validated.success) {
    submitState.value = "error";
    const errors = validated.error.flatten().fieldErrors;
    emailErrorMessage.value = errors.email?.[0] || "";
    passwordErrorMessage.value = errors.password?.[0] || "";
    return;
  }

  // Log the user in
  const user = await login(validated.data.email, validated.data.password);
  if (user) {
    submitState.value = "success";
    notify.success("Login Success", "You have been successfully logged in.");
    navigateTo("/dashboard");
  } else {
    submitState.value = "error";
  }
};
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <section class="w-1/3 bg-bgr-light rounded-2xl p-12 flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Login</h1>
      <Text
        v-model="email"
        type="email"
        label="Email"
        icon="mail-line"
        placeholder="marko@markomaric.me"
        :variant="emailErrorMessage ? 'danger' : 'default'"
        :error-message="emailErrorMessage"
        @enter="loginUser"
      />
      <Text
        v-model="password"
        type="password"
        label="Password"
        icon="lock-line"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        :variant="passwordErrorMessage ? 'danger' : 'default'"
        :error-message="passwordErrorMessage"
        @enter="loginUser"
      />

      <div class="flex flex-row gap-2 items-center justify-end">
        <Button variant="link" label="Create Account" @click="navigateTo('/register')" />
        <Button v-model="submitState" variant="brand" label="Login" @click="loginUser" />
      </div>
    </section>
  </div>
</template>
