<template>
  <q-page padding>
    <div class="flex flex:col ai:center w:full">
      <p class="font-main-title text:center bb:2|solid|#4B2E1D w:full">
        註冊成功
      </p>
      <img class="w:50%" src="/images/avatar.png" />
      <div class="flex mt:20 ai:center jc:center">
        <img class="w:100%" src="/images/text_bg_small.png" />
        <p class="abs font-subtitle text:center my:0! w:calc(100%-92px)">
          已註冊成功，請關閉頁面
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const firstLoad = localStorage.getItem('firstLoad') === null;
  if (firstLoad) {
    localStorage.setItem('firstLoad', 'false');
    window.location.reload();
  }
});
</script>
