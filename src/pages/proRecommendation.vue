<template>
  <q-header
    id="recommendationHeader"
    elevated
    class="bg-primary text-white bt:2|solid|#4B2E1D"
    height-hint="98"
  >
    <q-tabs class="bg:white px:8 pt:19 pb:17">
      <div
        class="flex flex-wrap:nowrap! ai:center jc:space-between w:full h:full gap:8"
      >
        <div
          class="flex flex:row flex-wrap:nowrap! jc:space-between w:calc(100%/2) h:full gap:8"
        >
          <img
            class="w:calc((100%-8px)/2) h:full"
            src="/images/tab1.png"
            @click="scrollToSection('section1')"
          />
          <img
            class="w:calc((100%-8px)/2) h:full"
            src="/images/tab2.png"
            @click="scrollToSection('section2')"
          />
        </div>
        <img
          class="w:calc((100%-8px)/2) h:full object-fit:fill"
          src="/images/tab3.png"
          @click="scrollToSection('section3')"
        />
      </div>
    </q-tabs>
  </q-header>
  <q-page class="px:32 pb:44">
    <div>
      <!-- Section 1 -->
      <div id="section1" :class="dynamicClass()">
        <p class="font-title text:center bb:2|solid|#4B2E1D">
          台灣社會心理復健協會
        </p>
        <div
          class="rel w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
        >
          <img
            class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
            src="/images/logo1.png"
          />
        </div>
        <div class="flex mt:36 ai:center jc:center">
          <img class="w:100%" src="/images/text_bg_small.png" />
          <p class="abs font-subtitle text:center my:0! w:calc(100%-92px)">
            - 與協會專員接洽取得協助 -
          </p>
        </div>
        <div class="flex ai:center jc:center mt:36 mb:28" @click="clickUrl(0)">
          <img class="w:60%" src="/images/go1.png" />
        </div>
      </div>
      <!-- Section 2 -->
      <div id="section2" :class="dynamicClass()">
        <div id="section1" :class="dynamicClass()">
          <p class="font-title text:center bb:2|solid|#4B2E1D">同儕支持</p>
          <div
            class="rel w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
          >
            <img
              class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
              src="/images/logo2.png"
            />
          </div>
          <div class="flex mt:36 ai:center jc:center">
            <img class="w:100%" src="/images/text_bg_small.png" />
            <p class="abs font-subtitle text:center my:0! w:calc(100%-92px)">
              - 與社群朋友一起分享事情 -
            </p>
          </div>
          <div class="flex ai:center jc:center mt:36 mb:28">
            <img class="w:60%" src="/images/go2.png" />
          </div>
        </div>
      </div>
      <!-- Section 3 -->
      <div id="section3" :class="dynamicClass()">
        <div id="section1" :class="dynamicClass()">
          <p class="font-title text:center bb:2|solid|#4B2E1D">
            身心醫師與院所推薦
          </p>
          <div
            class="rel w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
          >
            <img
              class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
              src="/images/logo3.png"
            />
          </div>
          <div class="flex mt:36 ai:center jc:center">
            <img class="w:100%" src="/images/text_bg_small.png" />
            <p class="abs font-subtitle text:center my:0! w:calc(100%-92px)">
              - 推薦給您的身心醫師與院所 -
            </p>
          </div>
          <div
            class="flex ai:center jc:center mt:36 mb:28"
            @click="clickUrl(2)"
          >
            <img class="w:60%" src="/images/go3.png" />
          </div>
        </div>
      </div>
    </div>
    <img
      class="fixed bottom:13 right:13 w:23vw"
      src="/images/backToTop.png"
      @click="scrollToSection('section1')"
    />
  </q-page>
</template>

<script setup lang="ts">
import { createMetaMixin } from 'quasar';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

const clickUrl = (index) => {
  switch (index) {
    case 0:
      window.open('https://www.tapsr.org.tw/service/23', '_blank');
    case 1:
      break;
    case 2:
      router.push({ name: 'Psychologists' });
      return;
    case 3:
      router.push({ name: 'Clinics' });
      return;
  }
};

const scrollToSection = (sectionId) => {
  // 找到對應的區塊元素
  const section = document.getElementById(sectionId);
  if (section) {
    // 平滑滾動到區塊
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const dynamicClass = () => {
  const headerHeight = document.getElementById(
    'recommendationHeader'
  )?.offsetHeight;
  const height = headerHeight + 16;
  return `pt:${height} mt:-${headerHeight}`;
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
  titleTemplate: (title) => `${title} - 專業推薦`,
};
createMetaMixin(metaData);
</script>
