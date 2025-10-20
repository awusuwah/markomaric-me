<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import IconButton from "@/components/button/IconButton.vue";
import Text from "@/components/inputs/text/Text.vue";
import { RESET_PASSWORD_SCHEMA } from "@/schemas/auth";

const { execute } = useApi();
const { notify } = useToast();
const { user } = useAuth();

const currentPassword = ref("");
const newPassword = ref("");

const currentPasswordErrorMessage = ref("");
const newPasswordErrorMessage = ref("");

const submitState = ref<ButtonState>("idle");

const changePassword = async (): Promise<void> => {
  submitState.value = "loading";

  const validated = RESET_PASSWORD_SCHEMA.safeParse({
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
  });
  if (!validated.success) {
    submitState.value = "error";

    const errors = validated.error.flatten().fieldErrors;
    currentPasswordErrorMessage.value = errors.currentPassword?.[0] || "";
    newPasswordErrorMessage.value = errors.newPassword?.[0] || "";
    return;
  }

  // Reset the password
  const { data, error, success } = await execute("/api/auth/reset-password", {
    method: "POST",
    body: {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    },
  });

  if (success) {
    submitState.value = "success";
    notify.success("Password Reset Success", "Your password has been successfully reset.");
  } else {
    submitState.value = "error";
    notify.danger("Password Reset Failed", error as string);
  }
};

const logout = async (): Promise<void> => {
  const { data, error, success } = await execute("/api/auth/logout", {
    method: "POST",
  });

  navigateTo("/login");
};
</script>

<template>
  <div class="w-screen h-screen grid place-items-center">
    <section class="w-1/3 bg-bgr-light rounded-2xl p-12 flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Change Password</h1>

      <Text
        v-model="currentPassword"
        type="password"
        label="Current Password"
        icon="lock-line"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        :variant="currentPasswordErrorMessage ? 'danger' : 'default'"
        :error-message="currentPasswordErrorMessage"
      />
      <Text
        v-model="newPassword"
        type="password"
        label="New Password"
        icon="lock-line"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        :variant="newPasswordErrorMessage ? 'danger' : 'default'"
        :error-message="newPasswordErrorMessage"
      />

      <pre>{{ user || "No user" }}</pre>

      <div class="flex flex-row gap-2 items-center justify-end">
        <Button v-model="submitState" variant="brand" label="Change Password" @click="changePassword" />
      </div>
    </section>
  </div>

  <IconButton variant="brand" icon="logout-box-line" size="lg" class="fixed bottom-4 left-4" @click="logout" />
</template>
