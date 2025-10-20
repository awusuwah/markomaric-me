<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Text from "@/components/inputs/text/Text.vue";
import { REGISTER_SCHEMA } from "@/schemas/auth";

const { execute } = useApi();
const { notify } = useToast();
const { register } = useAuth();

const firstname = ref("");
const lastname = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const firstnameErrorMessage = ref("");
const lastnameErrorMessage = ref("");
const usernameErrorMessage = ref("");
const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");

const submitState = ref<ButtonState>("idle");

const registerUser = async (): Promise<void> => {
  submitState.value = "loading";

  const validated = REGISTER_SCHEMA.safeParse({
    firstname: firstname.value,
    lastname: lastname.value,
    username: username.value,
    email: email.value,
    password: password.value,
  });
  if (!validated.success) {
    submitState.value = "error";
    const errors = validated.error.flatten().fieldErrors;
    firstnameErrorMessage.value = errors.firstname?.[0] || "";
    lastnameErrorMessage.value = errors.lastname?.[0] || "";
    usernameErrorMessage.value = errors.username?.[0] || "";
    emailErrorMessage.value = errors.email?.[0] || "";
    passwordErrorMessage.value = errors.password?.[0] || "";
    return;
  }

  // Create a new user account
  await register(firstname.value, lastname.value, username.value, email.value, password.value);
};
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <section class="w-1/3 bg-bgr-light rounded-2xl p-12 flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Create an account</h1>
      <div class="flex flex-col md:flex-row gap-4">
        <Text
          v-model="firstname"
          type="text"
          label="Firstname"
          placeholder="Marko"
          :variant="firstnameErrorMessage ? 'danger' : 'default'"
          :error-message="firstnameErrorMessage"
        />
        <Text
          v-model="lastname"
          type="text"
          label="Lastname"
          placeholder="Maric"
          :variant="lastnameErrorMessage ? 'danger' : 'default'"
          :error-message="lastnameErrorMessage"
        />
      </div>
      <Text
        v-model="username"
        type="text"
        label="Username"
        icon="user-line"
        placeholder="awusuwah"
        :variant="usernameErrorMessage ? 'danger' : 'default'"
        :error-message="usernameErrorMessage"
      />
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

      <div class="flex flex-row gap-2 items-center justify-end">
        <Button variant="link" label="Login" @click="navigateTo('/login')" />
        <Button v-model="submitState" variant="brand" label="Register" @click="registerUser" />
      </div>
    </section>
  </div>
</template>
