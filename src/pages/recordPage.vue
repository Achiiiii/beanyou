<template>
  <q-page class="bg:url('../images/recordBg.png') background-size:cover p:26">
    <div
      class="flex rel flex:col ai:center w:full h:full bg:url('../images/recordAvatarBg.png') background-size:100%|100% gap:25 pt:30 pb:127"
    >
      <img class="w:150 h:150" src="/images/avatar.png" />
      <p class="font-content-title">今日整體情緒指數</p>
      <img class="w:47vw" src="/images/scoreBtn5.png" @click="setScore(5)" />
      <img class="w:47vw" src="/images/scoreBtn4.png" @click="setScore(4)" />
      <img class="w:47vw" src="/images/scoreBtn3.png" @click="setScore(3)" />
      <img class="w:47vw" src="/images/scoreBtn2.png" @click="setScore(2)" />
      <img class="w:47vw" src="/images/scoreBtn1.png" @click="setScore(1)" />
      <img class="abs bottom:50 w:18vw" src="/images/recordHint.png" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { mutateScore } from '../api/helper';
import { createMetaMixin } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();

const setScore = async (score) => {
  const data = {
    emotionalScoreRecordUpdateInput: {
      score,
    },
  };
  const { mutate, onDone } = await mutateScore();
  mutate(data);
  onDone(() => {
    router.push({ name: 'EmotionalScoreRecords' });
  });
};

const metaData = {
  title: 'Bean You',
  titleTemplate: (title) => `${title} - 個人紀錄`,
};
createMetaMixin(metaData);
</script>
