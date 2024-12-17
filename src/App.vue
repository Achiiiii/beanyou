<template>
  <router-view />
</template>

<script setup lang="ts">
import '@master/css';
</script>
<style>
@font-face {
  font-family: 'GenJyuuGothicX';
  src: url('/fonts/GenJyuuGothicX-Bold.ttf') format('truetype');
}
body {
  color: #4b2e1d;
  font-family: 'GenJyuuGothicX', Arial, sans-serif;
}
.font-main-title {
  font-size: 10.5vw;
  white-space: nowrap;
}
.font-title {
  font-size: 8vw;
  white-space: nowrap;
}
.font-button {
  font-size: 7vw;
  white-space: nowrap;
}
.font-subtitle {
  font-size: 5.5vw;
}
.font-content-title {
  font-size: 3.8vw;
}
.font-content {
  font-size: 3vw;
}
</style>
