<script setup lang="ts">
import { z } from "zod";
import Button from "@/components/button/Button.vue";
import Text from "@/components/inputs/text/Text.vue";

const { notify } = useToast();
const { execute, error, loading } = useApi();

const email = ref("");
const password = ref("");

const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");

const login = async (): Promise<void> => {
  const validated = LOGIN_SCHEMA.safeParse({ email: email.value, password: password.value });
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    emailErrorMessage.value = errors.email?.[0] || "";
    passwordErrorMessage.value = errors.password?.[0] || "";
    console.log("Errors: ", emailErrorMessage.value, passwordErrorMessage.value);
    return;
  }

  const { data, error, success } = await execute("/api/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });

  if (success) {
    notify.success("Login Success", "You have been successfully logged in.");
  } else {
    notify.danger("Login Failed", error as string);
  }
};

const LOGIN_SCHEMA = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(10, { message: "Too short (min 10 characters)" }),
});
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <section class="w-1/3 bg-bgr-light rounded-2xl p-12 flex flex-col gap-4">
      <Text
        v-model="email"
        type="email"
        label="Email"
        icon="mail-line"
        placeholder="marko@markomaric.me"
        :variant="emailErrorMessage ? 'danger' : 'default'"
        :error-message="emailErrorMessage"
      />
      <Text
        v-model="password"
        type="password"
        label="Password"
        icon="lock-line"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        :variant="passwordErrorMessage ? 'danger' : 'default'"
        :error-message="passwordErrorMessage"
      />

      <div class="flex flex-row gap-2 justify-end">
        <Button variant="brand" style-variant="solid" label="Login" @click="login" />
      </div>
    </section>
  </div>
</template>
