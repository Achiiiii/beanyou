<template>
  <q-header
    id="psyHeader"
    elevated
    class="bg-primary text-white bt:2|solid|#4B2E1D"
    height-hint="98"
  >
    <q-tabs class="bg:white px:32 py:16">
      <div
        class="rel flex bg:url('../images/starTab.png') background-size:100%|100% w:full h:53px"
      >
        <div class="abs top:0 flex w:full h:calc(100%-16%) overflow-y:hidden">
          <div class="flex ai:center jc:center w:full">
            <div
              class="font-content-title text:center my:0! w:full color:#4b2e1d text:center"
              v-html="'大雪 (12/06~12/21)'"
            />
          </div>
        </div>
      </div>
    </q-tabs>
  </q-header>
  <q-page class="px:32 pb:44">
    <p class="font-title text:center bb:2|solid|#4B2E1D mt:24">節氣星空</p>
    <div
      class="flex bg:url('../images/text_bg_mid.png') background-size:100%|100% w:full h:175px p:20 mt:36 mb:40"
    >
      <div class="w:full h:full overflow-y:scroll">
        <div class="flex ai:start w:full">
          <div
            class="font-content-title text:start my:0! w:full"
            v-html="
              '雖然跟真正的廿四節氣意義無關，不過我們「斷章取意」來點諧音梗；讓我們的生活沒有過不了的過節，也沒有該生的氣，更或是讓我們的生活更有幸福的氣氛、節節皆捷！'
            "
          />
        </div>
      </div>
    </div>
    <div v-for="(date, index) in dates" :key="`date-${index}`">
      <div>
        <p class="font-title text:center bb:2|solid|#4B2E1D mt:24">
          {{ date.title }}
        </p>
        <div
          class="rel mb:40 w:full flex jc:center ai:center bg:url('../images/img_bg_border.png') background-size:contain aspect-ratio:694/490"
        >
          <img
            class="abs obj:cover left:0 bottom:0 w:92% h:88% overflow:hidden z-index:-1"
            :src="date.image"
          />
        </div>
        <div
          class="flex bg:url('../images/text_bg_large.png') background-size:100%|100% w:full h:220px p:20"
        >
          <div class="w:full h:full overflow-y:scroll">
            <div class="flex ai:start w:full">
              <div
                class="font-content text:start my:0! w:full"
                v-html="date.content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex bg:url('../images/text_bg_small.png') background-size:100%|100% w:full h:110px p:20 mt:38 mb:40"
    >
      <div class="w:full h:full flex ai:center overflow-y:scroll">
        <div class="flex ai:start w:full">
          <div
            class="font-content-title text:center my:0! w:full"
            v-html="'本星座內容為星星王子公益合作提供</br>「版權所有」'"
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
import { queryClinics } from '../api/helper';

const { result, onResult } = queryClinics();
const data = ref([]);
const dates = ref([
  {
    title: '白羊座(03/21-04/19)',
    image: '/images/白羊.jpg',
    content:
      '太陽白羊座的人一旦感受到環境的抗力，反而是會興奮的，如果沒有這些抗力，就會自己找麻煩出來，而今年的大雪總難免會有些壓力與責任出現，但這反而會使你想要去證明自己，不過要使自己別犯傻找麻煩。不過還好羊兒也都有著自己的信念，這使得羊兒們能夠樂觀面對挑戰來證明自己。梅乾扣肉是個不錯的時節菜外，也因為天氣更寒，更可以來個剝皮辣椒雞湯，些微辣的口感再加上甜鹹味，增加熱情與鬥志。',
  },
  {
    title: '金牛座(04/20-05/20)',
    image: '/images/金牛.jpg',
    content:
      '牛兒們不是不擔憂，而是更明白擔憂前還有很多事得做，不過大雪這個節氣往往使他們會因此害怕不足而更為擔憂，雖然在外展現不會太明顯，但是焦慮感會比平時更多，開始會與人有些爭執。此時就不能不使自己吃喝些讓自己開心的食物，其中最推薦義大利料理，因為含有大量的番茄，其中茄紅素的抗養化作用可以中和掉因為壓力、擔憂而多出的自由基，也能使人感到愉悅開心，更能產生好的膽固醇，讓心血管的狀態可以更好。',
  },
  {
    title: '雙子座(05/21-06/21)',
    image: '/images/雙子.jpg',
    content:
      '好壞皆來自因果，收獲善果，卻也要收捨惡果，大雪的節氣因惡果而更心寒，卻因善果而心生暖意，一旦皆為因果，就要從最源頭來看，事出必有因，只有自己知道發生過什麼，因此面對惡果，才能轉為善因，就是更真實的給他人溫暖、對他人好！心念一轉，處境也就轉變了，好運反而也真的到來了，人家還在大雪，你就已經化雪了。而此時沒什麼比能分著吃喝的飲食更好的選擇了，像是一同吃個火鍋、薑母鴨、麻油雞，或是來個批薩，或是西式家庭餐廳，大家分食之。',
  },
  {
    title: '巨蟹座(06/22-07/22)',
    image: '/images/巨蟹.jpg',
    content:
      '容易擔心的蟹子們在今年大雪的節氣最是不適，倍感辛勞已是累人，而心力又交瘁，也無人可以分擔，並且就算有人能分憂解勞，卻也因為心中不良情緒而向對方埋怨的方式不佳，造成更大的誤會。當無力與慌亂時，靜坐就好，這不需要儀式，找一杯自己喜歡的花草茶，坐著看向遠方，想像自己是個釣客，將所有情緒丟向池塘，甩桿後想像魚兒上釣慢慢拉回來，如果是不好的情緒就丟回池塘放生；好的情緒就放進魚網中，待會用餐時倒進湯裡補補自己的心。',
  },
  {
    title: '獅子座(07/23-08/22)',
    image: '/images/獅子.jpg',
    content:
      '有事做是最該開心的，能做出最好的自我表現，不過真正的幸福不是指揮他人，而是自己帶頭做，在今年大雪的節氣認真的為自己的期待及想要做出努力，免得以後沒人想聽從你的頤指氣使。這些都在替未來做更大的準備，明年的處境是孤單的，不是因為你以為你是領導者，而是你沒有真正的好朋友。此時很適合喝濃湯，不論是馬鈴薯濃湯，還是秋葵濃湯、南瓜濃湯、玉米濃湯、洋蔥濃湯、蘑菇濃湯。',
  },
  {
    title: '處女座(08/23-09/22)',
    image: '/images/處女.jpg',
    content:
      '只做好自己會的事，別人的好壞不做批判，而自己若不會就去學去問，充實好自己，才能面對未來的問題，今年的大雪也許更突顯了自己的領導能力，或是也使自己看到不足，這些察覺在內心中如明鏡提醒著你。今年的大雪很適合暖心暖胃的飲食，因此冰冷的飲食要避免，而山藥就適合，可以煎也可以燉雞湯，除此之外，以麻油與薑為底的菜色也很適合，像是麻油雞、麻油煎蛋、麻油松阪肉片佐高麗菜。',
  },
  {
    title: '天秤座(09/23-10/23)',
    image: '/images/天秤.jpg',
    content:
      '不安感總會悄然走進某個秤盤中，使得秤子們總是得花精神去找到砝碼來平衡，然後很不甘心地感到不平衡，其實秤盤愛在那裡就那裡，不需要因為他人而感到不安，做好自己應該做的事就夠好了。今年的大雪要秤子多為自己想想，什麼做得夠好了就盡了責，一切就靜待雪化天明。用麻油煎蛋，再倒些米酒或是水後加點糖來煨蛋，或是來點蟹肉滑蛋，能使自己感到溫暖幸福。',
  },
  {
    title: '天蠍座(10/24-11/22)',
    image: '/images/天蠍.jpg',
    content:
      '任何不安就是要以實際行動來化解，自己做得不對了，更是需要調整到對的方向，而不能以本能造成更大的傷害，危機時時都有，只有壯大自己，才能見招拆招一一化解，同時眼界一定要夠大，才能使心境也變大。今年的大雪是個檢查自我對錯的時候，在還沒有更糟前，趕緊修正，當然，在還能更好，就更該努力使自己走向更好的道路。栗子的季節到了，入菜是很好的選擇，不論油飯，或是燒雞，甚至是當零食吃。',
  },
  {
    title: '射手座(11/23-12/21)',
    image: '/images/射手.jpg',
    content:
      '幸福時刻就要好好品味，尤其是與他人共同擁有的幸福，不要提出自己的期望而破壞了那個共有的瞬間，如果能投其所好，會更能使相互的幸福延續更久，因此當突發的想法冒出來時，就先想想對方喜歡嗎？今年的大雪是個共有的節氣，一旦想到自己，就要想誰對你最好，你也要對他好，相互才能有溫暖的交流。如果堅果不會過敏就可以多吃點堅果，尤其是花生，要不就是吃點健康的蛋白質，像雞肉就挺好的。',
  },
  {
    title: '磨羯座(12/22-01/19)',
    image: '/images/磨羯.jpg',
    content:
      '當下看不到價值不代表未來沒有，一旦能看得更遠，現在就不辛苦。當下有許多值得擁有，未來要能維持這些擁有，甚至還有更多值得你所擁有的，因此要讓自己能看到不同的意義，也要使自己再加把勁。今年的大雪是不是真有那麼冷，你心中想到自己所擁有的，這份溫暖不會使你受寒，因為你努力過。自己喜歡飲食也許有些邪惡，但是努力後給自己一點犒賞也挺不錯，多吃些橄欖油料理更好。',
  },
  {
    title: '寶瓶座(01/20-02/18)',
    image: '/images/寶瓶.jpg',
    content:
      '走自己想走的路，當然連吃吃喝喝都要做自己，因此這個大雪的節氣，要跟認同自己的人一起混，節氣所帶來的外在環境不容易，但是自己得要輕鬆點，該努力是自己想要的努力，該放鬆是自己想要的放鬆。自己想要吃喝什麼最重要，讓自己感到開心與自在，才能在這個冷冰冰的節氣有著自己想要的溫暖，熱辣滾燙才開心，尤其是跟好朋友一起說天談地聊八卦，只有懂你的人才明白你的喜怒哀樂。',
  },
  {
    title: '雙魚座(02/19-03/20)',
    image: '/images/雙魚.jpg',
    content:
      '形式上的認真必須維持，這多少是衝突的，畢竟你根本不想努力，但是想一想，也許這件事對他人有幫助，既使只有一個人的忙都得幫，不是嗎？因此振奮起來，努力過後就能得到成績，重點是幫了忙了。今年大雪的天人交戰，會使一些本應完成的事變得毫無進展，一個放鬆就會變成往後的壓力，一旦卡住了，就站起來走走，再回到位置上完成。萵苣的季節到了，菜心正好可以切片炒肉吃！',
  },
]);

onResult(() => {
  data.value = result.value;
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 使用平滑滾動效果
  });
};

const metaData = {
  title: 'Bean You',
  titleTemplate: (title) => `${title} - 專業推薦`,
};
createMetaMixin(metaData);
</script>
