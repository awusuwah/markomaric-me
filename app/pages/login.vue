<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Toast from "@/components/toast/Toast.vue";

const { execute, error, loading } = useApi();

const authenticateUserCorrectly = async (): Promise<void> => {
  const { data, error, success } = await execute("/api/login", {
    method: "POST",
    body: {
      email: "marko@markomaric.me",
      password: "1234567890",
    },
  });

  console.log("[Login] Response: ", data, error, success);
};

const authenticateUserIncorrectly = async (): Promise<void> => {
  const { data, error, success } = await execute("/api/login", {
    method: "POST",
    body: {
      email: "incorrect@email.com",
      password: "incorrectpassword",
    },
  });

  console.log("[Login] Response: ", data, error, success);
};
</script>

<template>
  <div class="p-4">
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <Button variant="brand" style-variant="solid" @click="authenticateUserCorrectly" />
        <Button variant="brand" style-variant="outline" @click="authenticateUserIncorrectly" />
      </div>
    </div>
  </div>

  <div class="flex gap-4">
    <Toast title="Success" message="This is a success message." variant="success" />
    <Toast title="Danger" message="This is an error message." variant="danger" />
    <Toast title="Warning" message="This is a warning message." variant="warning" />
    <Toast title="Info" message="This is an info message." variant="info" />
  </div>
</template>
