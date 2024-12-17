<template>
  <q-header
    id="recommendationHeader"
    elevated
    class="bg-primary text-white bt:2|solid|#4B2E1D"
    height-hint="98"
  >
    <q-tabs class="bg:white px:24 pt:19 pb:17">
      <div class="flex flex-wrap:nowrap! ai:center jc:space-between w:full">
        <img class="w:calc((100%-70px)/3)" :src="tab0" @click="clickTab(0)" />
        <img class="w:calc((100%-70px)/3)" :src="tab1" @click="clickTab(1)" />
        <img class="w:calc((100%-70px)/3)" :src="tab2" @click="clickTab(2)" />
      </div>
    </q-tabs>
  </q-header>
  <q-page class="px:32 pbpage:44">
    <div v-show="!hasRecord">
      <p class="font-content-title text:center mt:24 mb:0 w:full">
        - 今天還未填寫心情紀錄喔 -
      </p>
      <div class="flex ai:center jc:center mt:36 mb:6">
        <img
          class="w:60%"
          src="/images/recordBtn.png"
          @click="clickUrl('Record')"
        />
      </div>
    </div>
    <div v-show="hasRecord" class="flex jc:center">
      <p class="font-content-title text:center mt:24 mb:16 w:full">
        {{ hint }}
      </p>
      <canvas v-show="tab !== 0" id="myChart" class="mb:20"></canvas>
      <q-select
        rounded
        standout
        class="w:60% mb:16 text:36"
        bg-color="orange"
        outlined
        v-model="date"
        :options="xValues"
      />
      <img class="w:full" :src="scoreImg" />
      <div class="flex ai:center jc:center mt:55 mb:6">
        <img
          class="w:58vw"
          src="/images/fixRecord.png"
          @click="clickUrl('Record')"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { createMetaMixin } from 'quasar';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { queryScore, queryToken } from '../api/helper';
import { createNewClient } from '../boot/apollo';
import { access } from 'fs';

const router = useRouter();
const hasRecord = ref(false);
const date = ref();
const tab = ref(0);
const xValues = ref([]);
const yValues = ref([]);
const tempData = ref([]);
let queryResultHandlers = {};
let myChart = null;

const getDate = (minusDay = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - minusDay);
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const score = computed(() => {
  return tempData.value[date.value];
});
const tab0 = computed(() => {
  return tab.value === 0 ? '/images/oneDay1.png' : '/images/oneDay.png';
});
const tab1 = computed(() => {
  return tab.value === 1 ? '/images/oneWeek1.png' : '/images/oneWeek.png';
});
const tab2 = computed(() => {
  return tab.value === 2 ? '/images/oneMonth1.png' : '/images/oneMonth.png';
});
const hint = computed(() => {
  return tab.value === 0
    ? '- 今天紀錄 -'
    : tab.value === 1
    ? '- 七日內紀錄 -'
    : tab.value === 2 && '- 一個月內紀錄 -';
});
const scoreImg = computed(() => {
  switch (score.value) {
    case 1:
      return '/images/score1.png';
    case 2:
      return '/images/score2.png';
    case 3:
      return '/images/score3.png';
    case 4:
      return '/images/score4.png';
    case 5:
      return '/images/score5.png';
    default:
      return '/images/score5.png';
  }
});

const clickTab = (index) => {
  if (index === 0) {
    queryResultHandlers.refetch({ fromDate: getDate(0), toDate: getDate(0) });
  } else if (index === 1) {
    queryResultHandlers.refetch({ fromDate: getDate(7), toDate: getDate(0) });
  } else {
    queryResultHandlers.refetch({ fromDate: getDate(30), toDate: getDate(0) });
  }
  tab.value = index;
};

const clickUrl = (name) => {
  router.push({ name: name });
};

const updateChart = () => {
  myChart.data.labels = xValues.value;
  myChart.data.datasets[0].data = yValues.value;
  myChart.update();
};

onMounted(async () => {
  const firstLoad = localStorage.getItem('firstLoad') === null;
  if (firstLoad) {
    localStorage.setItem('firstLoad', 'false');
    window.location.reload();
  }

  if (!myChart) {
    const ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues.value,
        datasets: [
          {
            fill: false,
            tension: 0, // 替代 v2 中的 lineTension
            backgroundColor: '#FEB739',
            borderColor: '#FEB739',
            data: yValues.value,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MM-DD',
              },
            },
            ticks: {
              maxRotation: 0,
              autoSkip: true,
            },
            bounds: 'data',
            distribution: 'linear',
          },
          y: {
            min: 0,
            max: 5,
            stepSize: 1,
          },
        },
      },
    });
  }

  const { result, onResult, refetch } = queryToken(
    localStorage.getItem('userId'),
    localStorage.getItem('lineAccessToken')
  );
  onResult(async () => {
    const accessToken = result.value?.token.data;
    if (!result.value) {
      return;
    }
    if (!result.value?.token.data) {
      refetch();
      return;
    }
    await createNewClient(accessToken);
    queryResultHandlers = queryScore(getDate(0), getDate(0), {
      clientId: 'clientA',
    });
    queryResultHandlers.onResult((resp) => {
      if (resp.data?.emotionalScoreRecords.length === 0 || !resp.data) {
        hasRecord.value = false;
        return;
      } else {
        hasRecord.value = true;
      }
      const reverseData = resp.data?.emotionalScoreRecords.slice().reverse();
      const xArray = [];
      const yArray = [];
      const temp = {};
      reverseData.forEach((data) => {
        xArray.push(data.recordDate);
        yArray.push(data.score);
        temp[data.recordDate] = data.score;
      });
      xValues.value = xArray;
      yValues.value = yArray;
      tempData.value = temp;
      date.value = xValues.value[0];
      updateChart();
    });
  });
});

const metaData = {
  title: 'Bean You',
  titleTemplate: (title) => `${title} - 個人紀錄`,
};
createMetaMixin(metaData);
</script>
