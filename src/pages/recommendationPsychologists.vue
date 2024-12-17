<template>
  <q-header
    id="psyHeader"
    elevated
    class="bg-primary text-white bt:2|solid|#4B2E1D"
    height-hint="98"
  >
    <q-tabs class="bg:white">
      <div class="rel w:full mx:44 mt:19 mb:17 ai:center jc:center">
        <div class="flex w:full gap:16">
          <img
            class="w:calc((100%-16px)/2)"
            :src="psychologistsTag"
            @click="clickTab(0)"
          />
          <img
            class="w:calc((100%-16px)/2)"
            :src="clinicsTag"
            @click="clickTab(1)"
          />
        </div>
        <img
          class="abs h:50% left:-10% top:20%"
          src="/images/backBtn.png"
          @click="clickUrl('Recommendation')"
        />
      </div>
    </q-tabs>
  </q-header>
  <q-page v-show="tab === 0" class="px:32 pb:44">
    <div v-for="psy in data?.psychologists" :key="psy.index">
      <div>
        <p class="font-title text:center bb:2|solid|#4B2E1D mt:24">
          {{ psy.title }}
        </p>
        <div
          class="rel w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
        >
          <img
            class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
            :src="psy.photoUrl"
          />
        </div>
        <p class="font-content-title text:center mt:24 mb:0 w:full">
          - {{ psy.position }} -
        </p>
        <div
          class="flex bg:url('../images/text_bg_large.png') background-size:100%|100% w:full h:220px p:20"
        >
          <div class="w:full h:full overflow-y:scroll">
            <div class="flex ai:start w:full">
              <p class="font-content-title text:start m:0! w:full">經歷：</p>
              <div
                class="font-content text:start my:0! w:full"
                v-html="psy.experience"
              />
            </div>
          </div>
        </div>
        <div
          class="flex bg:url('../images/text_bg_mid.png') background-size:100%|100% w:full h:175px p:20 mt:24"
        >
          <div class="w:full h:full overflow-y:scroll">
            <div class="flex ai:start w:full">
              <p class="font-content-title text:start m:0! w:full">學歷：</p>
              <div
                class="font-content text:start my:0! w:full"
                v-html="psy.education"
              />
            </div>
          </div>
        </div>
        <div
          class="flex bg:url('../images/text_bg_small.png') background-size:100%|100% w:full h:110px p:20 mt:24"
        >
          <div class="w:full h:full overflow-y:scroll">
            <div class="flex ai:start w:full">
              <p class="font-content-title text:start m:0! w:full">專長：</p>
              <div
                class="font-content text:start my:0! w:full"
                v-html="psy.specialty"
              />
            </div>
          </div>
        </div>
        <div class="flex ai:center jc:center mt:30 mb:6">
          <img class="w:60%" src="/images/linkBtn.png" />
        </div>
      </div>
    </div>
    <img
      class="fixed bottom:13 right:13 w:23vw"
      src="/images/backToTop.png"
      @click="scrollToTop()"
    />
  </q-page>
  <q-page v-show="tab === 1" class="px:32 pb:44">
    <div v-for="clinic in clinicData?.medicalUnits" :key="clinic.index">
      <div v-if="clinic.name">
        <p
          class="font-title text:center bb:2|solid|#4B2E1D mt:24 overflow:scroll"
        >
          {{ clinic.name }}
        </p>
        <div
          v-if="clinic.photoUrl"
          class="rel w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
        >
          <img
            class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
            :src="clinic.photoUrl"
          />
        </div>
        <div
          class="flex bg:url('../images/text_bg_small.png') background-size:100%|100% w:full h:110px p:20 mt:36"
        >
          <div class="flex w:full h:full overflow-y:scroll">
            <div class="flex flex:col ai:center jc:center w:full">
              <div class="flex flex:row">
                <img class="mr:4" src="/images/location.png" />
                <p class="flex m:0! font-content-title">
                  {{ clinic.address }}
                </p>
              </div>
              <div class="flex flex:row">
                <img class="mr:4" src="/images/phone.png" />
                <p class="flex m:0! font-content">{{ clinic.phone }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex ai:center jc:center mt:36 mb:6">
          <img
            class="w:60%"
            src="/images/linkBtn.png"
            @click="clickLink(clinic.websiteLink)"
          />
        </div>
      </div>
    </div>
    <img
      class="fixed bottom:13 right:13 w:23vw"
      src="/images/backToTop.png"
      @click="scrollToTop()"
    />
  </q-page>
</template>

<script setup lang="ts">
import { createMetaMixin } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { queryPsychologists } from '../api/helper';
import { computed } from 'vue';
import { queryClinics } from '../api/helper';

const router = useRouter();
const { result, onResult } = queryPsychologists();
const { result: clinicResult, onResult: clinicOnResult } = queryClinics();
const data = ref([]);
const clinicData = ref([]);
const tab = ref(0);

const psychologistsTag = computed(() => {
  return tab.value === 0
    ? '/images/doctor_enable.png'
    : '/images/doctor_disable.png';
});
const clinicsTag = computed(() => {
  return tab.value === 1
    ? '/images/clinic_enable.png'
    : '/images/clinic_disable.png';
});

clinicOnResult(() => {
  clinicData.value = clinicResult.value;
});

const clickLink = (link) => {
  window.open(link, '_blank');
};

onResult(() => {
  data.value = result.value;
});

const clickUrl = (name) => {
  router.push({ name: name });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const clickTab = (index: number) => {
  tab.value = index;
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  });
};

const metaData = {
  title: 'Bean You',
  titleTemplate: (title) => `${title} - 專業推薦`,
};
createMetaMixin(metaData);
</script>
