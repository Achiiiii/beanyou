<template>
  <q-page padding>
    <!-- content -->
    <h1>Hello World</h1>
    <q-btn color="blue" icon-right="send" label="logout" @click="logout" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = () => {
  localStorage.removeItem('accessToken');
  router.push({ name: 'IndexPage' });
};
</script>
