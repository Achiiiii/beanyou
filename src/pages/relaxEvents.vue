<template>
  <q-page class="p:32">
    <div class="flex flex-wrap:nowrap! ai:center jc:space-between my:16">
      <img class="w:calc((100%-64px)/3)" :src="tab0" @click="selectTab(0)" />
      <img class="w:calc((100%-64px)/3)" :src="tab1" @click="selectTab(1)" />
      <img class="w:calc((100%-64px)/3)" :src="tab2" @click="selectTab(2)" />
    </div>
    <p class="font-main-title text:center bb:2|solid|#4B2E1D">{{ title }}</p>
    <div
      class="rel w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
    >
      <img
        class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
        :src="gifSrc"
      />
    </div>
    <div class="flex mt:20 ai:center jc:center">
      <img class="w:100%" src="/images/text_bg_small.png" />
      <p class="abs text:center my:0! w:calc(100%-92px)">
        {{ introText }}
      </p>
    </div>
    <div class="flex ai:center jc:center mt:20" @click="clickUrl(0)">
      <img class="w:100%" src="/images/button01.png" />
      <p class="abs font-button my:0!">{{ linkTitle1 }}</p>
    </div>
    <div class="flex ai:center jc:center mt:20" @click="clickUrl(1)">
      <img class="w:100%" src="/images/button02.png" />
      <p class="abs font-button my:0!">{{ linkTitle2 }}</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { createMetaMixin } from 'quasar';
import { ref, computed, onMounted } from 'vue';
import { queryRelaxEvents } from '../api/helper';

const data = ref();

const title = ref('');
const linkTitle1 = ref('');
const linkTitle2 = ref('');
const link = ref(['', '']);
const introText = ref('');

const relaxTab = ref(0);
const tab0 = computed(() => {
  return relaxTab.value === 0 ? '/images/relax_01.png' : '/images/relax_04.png';
});
const tab1 = computed(() => {
  return relaxTab.value === 1 ? '/images/relax_02.png' : '/images/relax_05.png';
});
const tab2 = computed(() => {
  return relaxTab.value === 2 ? '/images/relax_03.png' : '/images/relax_06.png';
});
const gifSrc = computed(() => {
  if (relaxTab.value === 0) {
    return '/gif/muscleRelax.gif';
  } else if (relaxTab.value === 1) {
    return '/gif/breathRelax.gif';
  } else {
    return '/gif/music.gif';
  }
});

const { result, onResult } = queryRelaxEvents();

onResult(() => {
  data.value = result.value;
  selectTab(0);
});

const selectTab = (tab) => {
  relaxTab.value = tab;
  title.value = data.value?.relaxEvents[tab].title;
  linkTitle1.value = data.value?.relaxEvents[tab].link1Title;
  linkTitle2.value = data.value?.relaxEvents[tab].link2Title;
  link.value[0] = data.value?.relaxEvents[tab].link1Url;
  link.value[1] = data.value?.relaxEvents[tab].link2Url;
  introText.value = data.value?.relaxEvents[tab].introText;
};

const clickUrl = (index) => {
  window.open(link.value[index], '_blank');
};

onMounted(() => {
  const firstLoad = localStorage.getItem('firstLoad') === null;
  if (firstLoad) {
    localStorage.setItem('firstLoad', 'false');
    window.location.reload();
  }
});

const metaData = {
  title: 'Bean You',
  titleTemplate: (title) => `${title} - 療育放鬆`,
};
createMetaMixin(metaData);
</script>
